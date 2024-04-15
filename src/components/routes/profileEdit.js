import FormInput from "../reusable/formInput"
import axios from 'axios';
import { useState, useEffect } from "react";
import { useAxiosPost } from "../../hooks/useAxiosPost";
import { useAxiosGet } from "../../hooks/useAxiosGet";
import Error from "../reusable/error";
import Loader from "../reusable/loader";

export default function ProfileEdit() {
    const detailName = ["First Name", "Last Name", "Preferred Name", "Bio", "Interest Tags"];
    const [dbData, setDbData] = useState([]);
    const { postData, postloading, posterror } = useAxiosPost();
    const { fetchData, loading, error } = useAxiosGet();

    useEffect(() => {
        const id = localStorage.getItem("Marketfy_ActiveUser");
        if (!isNaN(id) && id !== 0) {
            const url = `http://localhost:8080/userDetails?id=${id}`
            fetchData(url, setttt)
            // axios.get(url)
            // .then( response => {
            //     console.log("Response Data: ", response.data);
            //     setDbData(response.data.slice(1))
            // })
        }
    }, []);

    function setttt(response) {
        setDbData(response.data.slice(1))
    }

    function handleEditDetails(event) {
        event.preventDefault();
        const id = localStorage.getItem("Marketfy_ActiveUser");
        const url = `http://localhost:8080/editUserDetails`;
        const formData = new FormData(event.target);
        const editedDetails = {
            id: id,
            first: formData.get(detailName[0]),
            last: formData.get(detailName[1]),
            preferred: formData.get(detailName[2]),
            bio: formData.get(detailName[3])
            // tags : formData.get(detailName[4])
        }
        console.log("edits: ", editedDetails);

        postData(url, editedDetails, window.location.href = "/profile/")
    }


    return (
        <><h1>Edit</h1>
            <div style={{ position: "relative" }} >
                {error ?
                    <Error></Error>
                    :
                    <>
                    {loading ?
                        <Loader></Loader>
                        :
                        <>
                        <form id="editDetails" onSubmit={handleEditDetails} style={{ position: "relative" }}>
                            {posterror ?
                                <Error></Error>
                            :
                            <>
                            {postloading ?
                                <Loader></Loader>
                            :
                            <>
                            {dbData.map((detail, index) =>

                                <FormInput key={index}
                                    name={detailName[index]} id={detailName[index]} value={detail} ></FormInput>
                            )}
                            <button
                                type="submit" htmlFor={"editDetails"}
                            >Save Changes</button>
                            </>
                            }
                            </>
                            }


                        </form>
                        </>
                    }
                    </>
                }

            </div>
        </>
    )
}
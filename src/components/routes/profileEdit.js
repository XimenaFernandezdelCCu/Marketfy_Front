import FormInput from "../reusable/formInput"
import axios from 'axios';
import { useState, useEffect } from "react";
import { useAxiosPost } from "../../hooks/useAxiosPost";
import { useAxiosGet } from "../../hooks/useAxiosGet";
import Error from "../reusable/error";
import Loader from "../reusable/loader";

export default function ProfileEdit() {
    // const detailName = ["First Name", "Last Name", "Preferred Name", "email", "Bio", "Interest Tags"];
    const detailName = ["Email", "First Name", "Last Name", "Preferred Name", "Bio", "Interest Tags"];

    const [dbData, setDbData] = useState([]);
    const { postData, postloading, posterror } = useAxiosPost();
    const { fetchData, loading, error } = useAxiosGet();
    const detailOptions = [
        {
            key: "email", 
            display: "Email"
        },
        {
            key: "first", 
            display: "First Name"
        },
        {
            key: "last", 
            display: "Last Name"
        },
        {
            key: "preferred", 
            display: "What do you want us to call you?"
        },
        {
            key: "bio", 
            display: "Bio"
        }, 
        {
            key: "interest", 
            display: "Interest Tags"
        }
    ]

    useEffect(() => {
        const id = localStorage.getItem("Marketfy_ActiveUser");
        if (!isNaN(id) && id !== 0) {
            const url = `http://localhost:8080/userDetails?id=${id}`
            fetchData(url, setttt)
        }
    }, []);

    function setttt(response) {
        setDbData(response.data)
    }

    function handleEditDetails(event) {
        event.preventDefault();
        const id = localStorage.getItem("Marketfy_ActiveUser");
        const url = `http://localhost:8080/editUserDetails`;
        const formData = new FormData(event.target);
        const first = formData.get(detailOptions[1].key);
        const preferred = formData.get(detailOptions[3].key);
        const editedDetails = {
            id: id,
            email: formData.get(detailOptions[0].key),
            first: first,
            last: formData.get(detailOptions[2].key),
            preferred: preferred,
            bio: formData.get(detailOptions[4].key)
            // tags : formData.get(detailName[4])
        }
        console.log("edits: ", editedDetails);

        postData(url, editedDetails, ()=>{
            localStorage.setItem("Marketfy_ActiveUser_Details", JSON.stringify({
                first: first,
                preferred: preferred
            }));
            window.location.href = "/profile/"}
        )
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
                            {/* {dbData.map((detail, index) =>

                                <FormInput key={index}
                                    name={detailName[index]} id={detailName[index]} value={detail} ></FormInput>
                            )} */}
                            {detailOptions.map((detail, index) =>

                            <FormInput key={index}
                                name={detail.display} id={detail.key}
                                value={dbData[detail.key] ? JSON.stringify(dbData[detail.key]).slice(1,-1):"" } 
                            ></FormInput>
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
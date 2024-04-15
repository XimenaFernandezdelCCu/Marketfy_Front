import Detail from "../reusable/detail";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom"
import { useAxiosGet } from "../../hooks/useAxiosGet";
import Loader from "../reusable/loader";
import Error from "../reusable/error";




export default function ProfileDetails(){
    const detailName = ["Email", "First Name", "Last Name", "Preferred Name", "Bio", "Interest Tags"];
    const [dbData, setDbData] = useState([]);
    const {fetchData, loading, error} = useAxiosGet();

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
        if (!isNaN(id) && id !== 0){
            const url = `http://localhost:8080/userDetails?id=${id}`
            fetchData(url, setttt)
        }  
    }, []);

    function setttt(response){
        setDbData(response.data);
    }

    return (
        <><h1>Details</h1>
            <div className="relative greyContainer rounded" >
                {error ?
                    <Error></Error>
                    :
                    <>
                        {loading ?
                            <Loader></Loader>
                            :
                            <>
                            {detailOptions.map((detail, index)=>
                                // detail ?
                                <Detail key={index}
                                name={detail.display} 
                                value={dbData[detail.key] ? JSON.stringify(dbData[detail.key]).slice(1,-1)
                                    :
                                    <>
                                    To add your {detailName[index]} go to: 
                                     <Link to='/profile/edit' className="HeaderLink" >Edit Profile</Link>
                                    </>
                                } 
                                ></Detail>
                                // :
                                // <div>
                                //     <h3>To add your {detailName[index]} go to: 
                                //     <Link to='/profile/edit' className="HeaderLink" >Edit Profile</Link>
                                //     </h3>
                                //     <hr/>
                                // </div>
                                
                            )}
                            </>
                        }
                    </>
                }

            </div>
       
        </>
    )
}
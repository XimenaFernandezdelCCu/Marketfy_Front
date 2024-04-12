import Detail from "../reusable/detail";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom"





export default function ProfileDetails(){
    const detailName = ["Email", "First Name", "Last Name", "Preferred Name", "Bio", "Interest Tags"];
    const [dbData, setDbData] = useState([]);
    
    useEffect(() => {
        const id = localStorage.getItem("Marketfy_ActiveUser");
        if (!isNaN(id) && id !== 0){
            const url = `http://localhost:8080/userDetails?id=${id}`
        axios.get(url)
        .then( response => {
            console.log("Response Data: ", response.data);
            setDbData(response.data)
        })
        }  
    }, []);

    return (
        <><h1>Details</h1>
        <div>
            {dbData.map((detail, index)=>
                detail ?
                <Detail key={index}
                name={detailName[index]} value={detail} ></Detail>
                :
                <div>
                    <h3>To add your {detailName[index]} go to: 
                    <Link to='/profile/edit' className="HeaderLink" >Edit Profile</Link>
                    </h3>
                    <hr/>
                </div>
                
            )}
        </div>
        </>
    )
}
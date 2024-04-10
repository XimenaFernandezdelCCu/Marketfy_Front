import { useState, useEffect } from "react";
import axios from "axios";
import Detail from "../reusable/detail";


export default function ProfileDetails(){
    const [dbData, setDbData] = useState([]);
    const detailName = ["Email", "First Name", "Last Name", "Preferred Name", "Bio", "Interest Tags"]

    useEffect(() => {
        const id = localStorage.getItem("Marketfy_ActiveUser");
        const url = `http://localhost:8080/userDetails?id=${id}`
        axios.get(url)
        .then( response => {
            console.log("Response Data: ", response.data);
            setDbData(response.data)
        })
        
    }, []);
    console.log("dbData", dbData);

    return (
        <><h1>Details</h1>
        <div>
            {dbData.map((detail, index)=>
                <Detail name={detailName[index]} value={detail} ></Detail>
            )}
        </div>
        </>
    )
}
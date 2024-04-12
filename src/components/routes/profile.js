import { useState, useEffect } from "react"
import axios from "axios";
import { Link } from "react-router-dom"
import { Outlet } from "react-router-dom";


export default function Profile(props){
    const [dbData, setDbData] = useState([]);

    
    useEffect(() => {
        const id = localStorage.getItem("Marketfy_ActiveUser");
        if (Number.isInteger(id) && id !== 0){
            const url = `http://localhost:8080/userDetails?id=${id}`
        axios.get(url)
        .then( response => {
            console.log("Response Data: ", response.data);
            setDbData(response.data)
        })
        }  
    }, []);

    return (
        <div>
            <div>
                <h1>Avatar</h1>
                <h1>Welcome NAME</h1>
                <ul>
                    <li><Link to='/profile/' className="HeaderLink" >User Details</Link></li>
                    <li><Link to='/profile/edit' className="HeaderLink" >Edit Profile</Link></li>
                    <li><Link to='/profile/wishlist' className="HeaderLink" >Wishlist</Link></li>
                    <li><Link to='/profile/orders' className="HeaderLink" >Order History</Link></li>
                </ul>
            </div>
            <div>
                <Outlet/>
            </div>

        </div>
    )
}

import { useState, useEffect } from "react"
import axios from "axios";
import { Link } from "react-router-dom"
import { Outlet } from "react-router-dom";


export default function Profile(props){
    const [dbData, setDbData] = useState([]);
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

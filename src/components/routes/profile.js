import { useState, useEffect } from "react"
import axios from "axios";
import { Link } from "react-router-dom"
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux"



export default function Profile(props){
    const reduxAuth = useSelector((state) => state.auth.auth);
    const isAuthenticated = reduxAuth;
    const activeUserDets = JSON.parse(localStorage.getItem("Marketfy_ActiveUser_Details"));
    const name = activeUserDets.preferred ?? activeUserDets.first;
    console.log("a", activeUserDets)

    useEffect(()=>{
        if (!isAuthenticated){
            window.location.href="/auth"
        }
    },[])


    return (
        <div>
            <div>
                <h1>Avatar</h1>
                <h1>Welcome {name}!</h1>
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

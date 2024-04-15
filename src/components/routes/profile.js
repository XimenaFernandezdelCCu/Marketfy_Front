import { useState, useEffect } from "react"
import axios from "axios";
import { Link } from "react-router-dom"
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux"
import avatar from '../../imgs/avatar.jpg'



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
            <div >
                <h1 className="title" >Welcome {name}!</h1>

                <div className="flex justifyEvenly wrapp"> 
                    <div className="m3"
                    style={{
                        height: "30vh"
                        }} 
                        > 
                        <img style={{width:"auto", height:"100%", borderRadius: "50%"}}
                        src={avatar} ></img>
                    </div>

                    <ul className="flex wrapp justifyEvenly"
                    style={{minWidth:"50%"}} >

                        <li className="right pillwhiteonOrange" ><Link to='/profile/' className="link" >User Details</Link></li>
                        <li className="right pillwhiteonOrange"><Link to='/profile/edit' className="link" >Edit Profile</Link></li>
                        <li className="right pillwhiteonOrange"><Link to='/profile/wishlist' className="link" >Wishlist</Link></li>
                        <li className="right pillwhiteonOrange"><Link to='/profile/orders' className="link" >Order History</Link></li>

                    </ul>
                </div>
            </div>
            <div>
                <Outlet/>
            </div>

        </div>
    )
}

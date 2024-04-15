
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux"
import { useEffect } from "react";


export default function Auth(){
    const reduxAuth = useSelector((state) => state.auth.auth);
    const isAuthenticated = reduxAuth;

    useEffect(()=>{
        if (isAuthenticated){
            window.location.href="/profile"
        }
    },[])

    return (
        <>
            <div>
                <h2>Welcome</h2>
            </div>
            <div>
                <Outlet/>
            </div>
            
        </>
    )
}
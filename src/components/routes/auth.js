
import { Outlet } from "react-router-dom";

export default function Auth(){

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
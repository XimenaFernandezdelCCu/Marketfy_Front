
import { useEffect } from "react"

//components
import LoginForm from "../small/LoginForm"
import SignupForm from "../small/SignupForm"


export default function Land(){

    return (
        <>
            <div>
                <h2>Welcome</h2>
            </div>
            <div>
                <LoginForm></LoginForm>
                
                <SignupForm></SignupForm>
                <div>
                    Dont/ Already have an account?
                </div>
            </div>
        </>
    )
}
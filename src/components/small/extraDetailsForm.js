
import FormInput from "../reusable/formInput"
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';


export default function ExtraDetailsForm(){

    const navigate = useNavigate();

    function handleExtraDetailsInput(){

    }

    return (
        <div>
            <p>
                <strong>Your Account was created successfully!</strong>
            </p>

            <h3>Profile Details</h3>

            <form 
            id="extraDetailsForm" 
            onSubmit={handleExtraDetailsInput}>
                <p>
                    <strong>We want to know more about you!</strong><br />
                    But if its not the right time, you can add this info in your profile.
                </p>

                <button onClick={()=>navigate('/auth/')} >Skip & Login</button>

                <FormInput name="Preferred Name" id="extraPreferred" type="text"  
                // onblur={(event)=>handleValidInputs(event, "mail", setValid)} 
                >
                {/* <small>{valid.mail==false?"Please provide a valid emal.":""}</small> */}
                </FormInput>

                <FormInput name="Bio" id="extraBio" type="text"  
                // onblur={(event)=>handleValidInputs(event, "pass", setValid)} 
                >
                {/* <small>{valid.pass==false?"Please enter your password.":""}</small> */}
                </FormInput>

                <div>
                --tags
                </div>


                {/* <small>{userFound==false?"We couldn't find this user, please rectify the information or create an account.":""}</small><br/> */}

                <div>
                    <button onClick={()=>navigate('/auth/')} >Skip & Login</button>

                    <button className="pill"  type="submit" htmlFor="loginForm" 
                    // DEV---------------------------
                    onClick={()=>navigate('/auth/')}
                    // disabled={!allow}
                    >Save Details</button>

                </div>
            </form>

            <div>
                <p>
                    <strong>Are you new here?</strong>
                    <Link to='/auth/signup' className="HeaderLink" >Create an Account</Link>
                </p>

            </div>





      
        </div>
    )
}
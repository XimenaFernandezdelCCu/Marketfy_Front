import axios from 'axios';
//hooks
import { useAxiosPost } from '../../hooks/useAxiosPost';
import { useNavigate } from 'react-router-dom';
import { loginAction } from '../../utils/responseActions';

import { Link } from 'react-router-dom';
//components
import FormInput from "../reusable/formInput"

export default function LoginForm(){
    const navigate = useNavigate();
    const {fetchData, doneFetching, data, error } = useAxiosPost();
    const url = 'http://localhost:8080/login';

    function handleLogin(event){
        event.preventDefault();
        //  Retrieve User Input: 
        const formData = new FormData(event.target);
        const user = {
            email : formData.get('loginEmail'), 
            pass : formData.get('loginPassword')
        }
        // const response = fetchData(url, user);
        
        axios.post(url, user)
        .then( response => {
            console.log("Response: ", response);
            if (response.status == 200){
                loginAction(response, navigate)
            }
        }).catch(error => {
            console.error("Oh no!", error)
        }); 
    }   

  
    return (
        <div>
            <h3>Login</h3>

            <form 
            id="loginForm" 
            onSubmit={handleLogin}>
                <p>
                    <strong>Welcome Back!</strong><br />
                    Please provide your authentication details.
                </p>

                <FormInput name="Email" id="loginEmail" type="email"  
                // onblur={(event)=>handleValidInputs(event, "mail", setValid)} 
                >
                {/* <small>{valid.mail==false?"Please provide a valid emal.":""}</small> */}
                </FormInput>

                <FormInput name="Password" id="loginPassword" type="password"  
                // onblur={(event)=>handleValidInputs(event, "pass", setValid)} 
                >
                {/* <small>{valid.pass==false?"Please enter your password.":""}</small> */}
                </FormInput>

                {/* <small>{userFound==false?"We couldn't find this user, please rectify the information or create an account.":""}</small><br/> */}

                <button className="pill"  type="submit" htmlFor="loginForm" 
                // disabled={!allow}
                >Login</button>
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
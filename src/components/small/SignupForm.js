
import { useAxiosPost } from "../../hooks/useAxiosPost";
//components
import FormInput from "../reusable/formInput"

export default function SignupForm() {

    const { fetchData, loading, data, error } = useAxiosPost();
    const url = 'http://localhost:8080/register';

    function handleSignup(event) {
        event.preventDefault();
        //  Retrieve User Input: 
        const formData = new FormData(event.target);
        const newUser = {
            email: formData.get('signupEmail'),
            pass: formData.get('signupPass'),
            first: formData.get('signupFirst'),
            last: formData.get('signupLast'),
        }
        //Send request
        const fecthResult = fetchData(url, newUser);





    }

    return (
        <div>
            <h3>Sign Up</h3>
            <form
                id="signupForm"
                onSubmit={handleSignup}
            >
                <p>
                    <strong>We're so excited to meet you!</strong><br />
                    Please provide the details below so we can create an account for you.
                </p>

                <div>
                    <h4>Name</h4>
                    <FormInput name="First" id="signupFirst" type="text"
                    // onblur={(event)=>handleValidInputs(event, "first", setValid)}
                    >
                        {/* <small>{valid.first==false?"Please enter your First Name.":""}</small> */}
                    </FormInput>
                    <FormInput name="Last" id="signupLast" type="text"
                    // onblur={(event)=>handleValidInputs(event, "last", setValid)}
                    >
                        {/* <small>{valid.last==false?"Please enter your Last Name.":""}</small> */}
                    </FormInput>
                </div>

                <FormInput name="Email" id="signupEmail" type="email"
                // onblur={(event)=>handleValidInputs(event, "mail", setValid)}
                >
                    {/* <small>{valid.mail==false?"Please provide a valid emal.":""}</small> */}
                </FormInput>

                <div>
                    <div className="formInput" >
                        <label htmlFor="signupPass">
                            <h4>Password</h4>
                        </label>
                        <input
                            // ref={pass1} onChange={handlePasswordMatch}
                            name="signupPass"
                            id="signupPass"
                            // onBlur={props.onblur}
                            placeholder="***********"
                            type="password"></input>
                    </div>

                    <hr />
                </div>

                <div>
                    <div className="formInput"
                    // style={{display:"flex", flexDirection:"column"}} 
                    >
                        <label htmlFor="signupPass2">
                            <h4>Type your password again</h4>
                        </label>
                        <input
                            // ref={pass2} onChange={handlePasswordMatch}
                            name="signupPass2"
                            id="signupPass2"
                            // onBlur={props.onblur}
                            placeholder="***********"
                            type="password"
                        ></input>

                    </div>
                    {/* <small>{passwordMatch?"":"The passwords don't match"}</small> */}
                    <hr />
                </div>

                <button className="pill" type="submit"
                // disabled={!allow}
                >
                    Create Account
                </button>
            </form>
            {/* {!createAccount ?   */}

            {/* // :
                //     <form 
                onSubmit={handlesignupSave}>
                //         <p>
                //             <strong>Complete your profile</strong><br/>
                //             We want to know more about you!<br/> But if you want, you can finish setting up your profile later in the "Profile" section. 
                //         </p>
                        
                //         <ExtraDets></ExtraDets><hr/>
    
                //         <div className="flex">
                //             <button className="pill" style={{backgroundColor:"white", color:"#cc8245" }} onClick={handlesignupLog}>Skip</button>
                //             <button className="pill" type="submit" >Save</button>
                //         </div>
                //     </form>
                // } */}


        </div>

    )




}

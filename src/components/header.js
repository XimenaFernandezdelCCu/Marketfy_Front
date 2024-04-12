import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { logoutAction } from "../utils/responseActions";
import { useEffect } from "react";


export default function Header(){
    const cartLength = useSelector((state) => state.cart.length);
    const reduxAuth = useSelector((state) => state.auth.auth);
    const dispatch = useDispatch();
    const isAuthenticated = reduxAuth;

    // useEffect(() => {
    //     const isAuthenticated = reduxAuth;
    // }, [reduxAuth])

    return (
        <header>
            <h1 className="title" >MARKETFY</h1>

            <div style={{display:"flex", justifyContent: "space-evenly"}} >


                <Link to='/' className="HeaderLink" >Shop</Link>


                <div style={{position:"relative"}}>
                    <Link to='/cart' className="HeaderLink" style={{marginRight:"2vw"}} >Cart</Link>
                    {cartLength>0 && <div className="notification">{cartLength}</div>}

                </div>

                { isAuthenticated ?
                    <>
                    <Link to='/profile' className="HeaderLink" >Profile</Link>
                    <a className="HeaderLink" onClick={()=>logoutAction(dispatch)} >Logout</a>
                    </>
                :
                    <>
                    <Link to='/auth' className="HeaderLink" >Login</Link>
                    </>
                }


                
            </div>
        </header>
    )
}
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { logoutAction } from "../utils/responseActions";


export default function Header(){
    const cartLength = useSelector((state) => state.cart.length);
    const reduxAuth = useSelector((state) => state.auth.auth);
    const dispatch = useDispatch();
    const isAuthenticated = reduxAuth;


    return (
        <header className="flex wrapp p3 justifyCenter">
            <h1 className="title" >MARKETFY</h1>

            <div className="flex justifyEvenly" style={{width:"80%"}} >


                <Link to='/' className="link" >Shop</Link>


                <div className="relative">
                    <Link to='/cart' className="link" >Cart</Link>
                    {cartLength>0 && <div className="notification">{cartLength}</div>}

                </div>

                { isAuthenticated ?
                    <>
                    <Link to='/profile' className="link" >Profile</Link>
                    <a className="link" onClick={()=>logoutAction(dispatch)} >Logout</a>
                    </>
                :
                    <>
                    <Link to='/auth' className="link" >Login</Link>
                    </>
                }


                
            </div>
        </header>
    )
}
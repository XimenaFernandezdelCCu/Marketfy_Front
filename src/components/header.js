import { Link } from "react-router-dom"
import { useSelector } from "react-redux";

export default function Header(){
    const cartLength = useSelector((state) => state.cart.length);
  
    return (
        <header>
            <h1 className="title" >MARKETFY</h1>

            <div style={{display:"flex", justifyContent: "space-evenly"}} >

                <Link to='/profile' className="HeaderLink" >Profile</Link>

                <div style={{position:"relative"}}>
                    <Link to='/cart' className="HeaderLink" style={{marginRight:"2vw"}} >Cart</Link>
                    {cartLength>0 && <div className="notification">{cartLength}</div>}

                </div>

                <Link to='/' className="HeaderLink" >Shop</Link>

                
            </div>
        </header>
    )
}
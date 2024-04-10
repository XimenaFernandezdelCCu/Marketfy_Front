import { Link } from "react-router-dom"
import { useSelector } from "react-redux";

export default function Header(){
    const cartLength = useSelector((state) => state.cart.length);
  
    return (
        <header>
            <h1 className="title" >MARKETFY</h1>

            <div style={{position:"relative"}} >

                <Link to='/' className="HeaderLink" >Shop</Link>

                {cartLength>0 && <div className="notification">{cartLength}</div>}

                <Link to='/cart' className="HeaderLink" style={{marginRight:"2vw"}} >Cart</Link>
            </div>
        </header>
    )
}
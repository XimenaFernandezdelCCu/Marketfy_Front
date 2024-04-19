import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartShopping } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
import { emptyCart } from "../../utils/utils"
// Redux 
import { useDispatch } from "react-redux"
//react
import { useState, useEffect, useContext } from "react"
// components
import { CartContext } from "../../context/cartContext"
import CartItemDetails from "../small/cartItemDetails";
import Checkout from "./checkout"
import Loader from "../reusable/loader"
import Error from "../reusable/error"

export default function Cart() {
    let {
        cartLength, 
        total, 
        checkout,
        setCheckout, 
        loading, 
        error
    }= useContext(CartContext);
    const dispatch = useDispatch();
    
    return (
        <div>
            <div className="flex"> 
                <FontAwesomeIcon icon={faCartShopping} />
                <h1 className="title" >Cart</h1>
            </div>

            <div className="greyContainer rounded relative m3" >

                {error?
                    <Error></Error>
                :
                    <>
                    {loading? 
                        <Loader></Loader>
                    :
                    <>
                    {cartLength > 0 ?
                        <div className="flexCol justifyCenter" >

                            <div className="flex justifybetween ">
                                <h4>{cartLength} items</h4>
                                <button onClick={()=>{emptyCart(dispatch); window.location.href="/cart"}} >Empty Cart</button>
                            </div>

                            <CartItemDetails></CartItemDetails>
                            <hr></hr>
                            <h3 style={{color:"#cc8245"}}>
                                Total: {total} </h3>
                            {/* {!checkout ?
                                <button className="pill"
                                onClick={() => { setCheckout(true) }}
                                >Checkout</button>
                            :
                            <Checkout total={total} setCheckout={setCheckout} ></Checkout>
                            } */}
                        </div>
                        :
                        <>
                            <h1>Your cart is empty!</h1>
                            <h4>You can add items to your cart in the
                                <Link to='/'>Shop</Link>. 
                            </h4>
                        </>   
                    }
                    </>
                    }

                    {cartLength > 0 &&
                    <>
                    {!checkout ? 
                        <div className="flex justifyCenter m3" >

                        <button className="pill"
                        onClick={() => { setCheckout(true) }}
                        >Checkout</button>
                        </div>
                        :
                        <Checkout total={total} setCheckout={setCheckout} ></Checkout>
                    }
                    </>
                    }


                    </>

                }

            </div>

            



        </div>
    )
}
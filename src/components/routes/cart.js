import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartShopping } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
import axios from "axios"
// Redux 
import { useSelector, useDispatch } from "react-redux"
//react
import { useState, useEffect, useContext } from "react"
// utils
import { countOccurrences, validateRawCart  } from "../../utils/utils"
// components
import { CartContext } from "../../context/cartContext"
import CartProvider from "../../context/cartContext"
import CartItemDetails from "../small/cartItemDetails";
import Checkout from "./checkout"

export default function Cart() {
    let {
        cartLength, 
        total, 
        checkout,
        setCheckout
    }= useContext(CartContext);
    
    return (
        <div>
            <FontAwesomeIcon icon={faCartShopping} />
            <h1>Cart</h1>
            {cartLength > 0 ?
                <div>
                    <h4>{cartLength} items</h4>
                    <CartItemDetails></CartItemDetails>
                    <hr></hr>
                    <h3>Total: {total} </h3>
                    {!checkout ?
                        <button className="pill"
                        onClick={() => { setCheckout(true) }}
                        >Checkout</button>
                    :
                        <Checkout total={total} setCheckout={setCheckout} ></Checkout>
                    }
                </div>
                :
                <>
                    <h1>Your cart is empty!</h1>
                    <h4>You can add items to your cart in the
                        <Link to='/'>Shop</Link>. 
                    </h4>
                </>
            }


        </div>
    )
}
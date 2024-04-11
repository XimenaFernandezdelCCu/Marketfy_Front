import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartShopping } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
import axios from "axios"
// Redux 
import { useSelector, useDispatch } from "react-redux"
//react
import { useState, useEffect } from "react"
// utils
import { countOccurrences, validateRawCart  } from "../../utils/utils"
// components
import CartItemDetails from "../small/cartItemDetails";
import Checkout from "./checkout"

export default function Cart() {
    const dispatch = useDispatch();
    const [dbData, setDbData] = useState([]);
    const [checkout, setCheckout]= useState(false);
    const rawCart = useSelector((state) => state.cart);
    let cartLength =[];
    let cartObj={};
    let ids=[]; 
    let total; 
    
    useEffect(() => {
        if(validateRawCart(rawCart, dispatch) ){

            const url = `http://localhost:8080/products/byIDs?ids=${ids}`
    
            axios.get(url)
            .then( response => {
                console.log("Response Data: ", response.data);
                setDbData(response.data)
                // setDbData(addQtytoData(response.data, cartObj))
            })
        }
    }, []);

    if (validateRawCart(rawCart, dispatch)) {
        cartLength = rawCart.length;
        cartObj = countOccurrences(rawCart);
        ids = cartObj.map((obj) => obj.id);
    } 
    
    // eliminate items not in the cart
    if(ids.length != dbData.length){
        dbData.map((it, index)=>{
            if (!ids.includes(it.productId)){
                let prev = dbData;
                prev.splice(index,1);
                setDbData(prev);
            }
        })
    }

    // calculate cart total
    if(dbData.length>0){
        total = ids.map((id)=>{
            return ((dbData.find((it)=>it.productId==id).price * cartObj.find((it)=>it.id==id).qty))
        }).reduce((acc,val)=>acc+parseFloat(val),0).toFixed(2)
    }


    return (
        <div>
            <FontAwesomeIcon icon={faCartShopping} />
            <h1>Cart</h1>
            <h4>{cartLength} items</h4>
            {cartLength > 0 ?
                <div>
                    <CartItemDetails dbData={dbData} cartObj={cartObj}></CartItemDetails>
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
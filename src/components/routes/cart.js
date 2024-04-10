import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartShopping } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
import axios from "axios"
// Redux 
import { useSelector } from "react-redux"
//react
import { useState, useEffect } from "react"
// utils
import { countOccurrences, addQtytoData } from "../../utils/utils"
// components
import CartItemDetails from "../small/cartItemDetails";

export default function Cart() {
    const [dbData, setDbData] = useState([]);
    const rawCart = useSelector((state) => state.cart);
    const cartLength = rawCart.length;
    const cartObj = countOccurrences(rawCart);
    const ids = cartObj.map((obj)=>obj.id);
    console.log("ids", ids);
    let total;

    
    useEffect(() => {
        if(rawCart.length != 0 && rawCart[0]!=0 ){

            const url = `http://localhost:8080/products/byIDs?ids=${ids}`
    
            axios.get(url)
            .then( response => {
                console.log("Response Data: ", response.data);
                setDbData(response.data)
                // setDbData(addQtytoData(response.data, cartObj))
            })
        }
    }, []);

    // const totalSum = (dbData.reduce((accumulator, currentValue) => {
    //     return accumulator + parseFloat(currentValue.itemTotal);
    // }, 0)).toFixed(2);
    // console.log("total Sum", totalSum)
    // console.log("data", dbData);

    if(ids.length != dbData.length){
        dbData.map((it, index)=>{
            if (!ids.includes(it.productId)){
                let prev = dbData;
                prev.splice(index,1);
                setDbData(prev);
            }
        })
    }

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
                    <button className="pill"
                    // onClick={() => { setCheckout(true) }}
                    >Checkout</button>
                </div>
                :
                <>
                    <h1>Your cart is empty!</h1>
                    <h4>You can add items to your cart in the
                        <Link to='/home'>Shop</Link>. 
                    </h4>
                </>
            }
        </div>
    )
}
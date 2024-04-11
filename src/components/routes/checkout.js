
import Payment from "../small/payment";
import Shipping from "../small/shipping";
import Loader from "../reusable/loader";
import { useState } from "react";
import '../../style/modal.css'

export default function Checkout({total, setCheckout}) {
    const [loader, setLoader]= useState(false);


    function showLoader() {
        setLoader(true);
        const timeout = setTimeout(() => {
            setLoader(false);
        }, 4000);

        return () => clearTimeout(timeout);
    }

    
    

    return (
        <div>
            
            <h1>Checkout</h1>
            <button
            onClick={() => setCheckout(false)}
            >Back to Cart</button>

            <div>
                <h2>Order Details</h2>
                <ul>
                    <li>name's order</li>
                    <li>3 Items</li>

                    <li>carts items map 
                    </li>

                    <li>total</li>
                </ul>
            </div>

            <div style={{
                position:"relative", 
                display:"flex", 
                justifyContent:"space-evenly", 
                flexWrap: "wrap"
                }}>

                {loader &&
                    <div
                    style={{
                        position: "absolute",
                        zIndex: "10",
                        width:"100%",
                        height: "100%",
                        backgroundColor:"rgba(215, 215, 215, 0.5)",
                        display:"flex", 
                        alignItems: "center", 
                        justifyContent: "center"
                

                    }}
                    >
                        <Loader 
                        className="modal"
                        ></Loader>
                    </div>
                }

                <div>
                    <h4>Confirm your contact Info</h4>
                    <p>Provide a phone</p>
                    <hr />
                </div>

                <Payment></Payment>
                <Shipping></Shipping>

            </div>

            <button
            onClick={showLoader}
            >PAY {total}</button>
                

                
        </div>
    )
}
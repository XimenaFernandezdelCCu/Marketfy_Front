import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBookOpen } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom";


export default function ProfileOrders(){
    const [dbData, setDbData] = useState({orders:[]});


    useEffect(() => {
        const id = localStorage.getItem("Marketfy_ActiveUser");
        if(!isNaN(id) && id !== 0){
            const url = `http://localhost:8080/ordersByUserId?userId=${id}`

            axios.get(url)
            .then( response => {
                console.log("Response Data: ", response.data);
                setDbData(response.data)
                // setDbData(addQtytoData(response.data, cartObj))
            }).catch(function (error){
                console.log("eeeeeeeeeeerrorrrrrrrrrr")
                setDbData([]);
            })
        }
        
    }, []);

    return (
        <>
        <h1>Orders</h1>
        <p>{dbData.userOrders} orders found:</p>

        <div>
            {dbData.orders.length>0?
                    <div style={{ display: "flex" }} >
                        {dbData.orders.map((order) =>
                            <div key={order.orderId}>
                                <h4>Order #{order.orderId}</h4>
                                <p>Received: {order.date}</p>
                                <li>{order.totalItems} Items:</li>
                                <li>
                                    {order.products.map((book, index) =>
                                        <div
                                            style={{ display: "flex", justifyContent: "space-evenly" }}
                                            key={book.productId}>

                                            <FontAwesomeIcon icon={faBookOpen} />
                                            <p>{book.qty} Copies of: </p>
                                            <p>{book.author}'s {book.title}</p>
                                        </div>
                                    )}
                                </li>
                                <li>Total: {order.total}</li>


                            </div>
                        )}
                    </div>
            : 
                <div>
                    <h2>Uh oh!</h2>                    
                    <h4>You havent bought any books yet! </h4>
                    <p>After you checkout, your order details will appear here</p>
                </div>
            }
            <Link to='/home'>Shop</Link>. 
        </div>

        </>
    )
}
import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBookOpen } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom";
import { useAxiosGet } from "../../hooks/useAxiosGet";
import Error from "../reusable/error";
import Loader from "../reusable/loader";
import Searchbar from "../reusable/searchbar";

export default function ProfileOrders(){
    const [dbData, setDbData] = useState({orders:[]});
    const [data, setData] = useState({orders:[]});
    const {fetchData, loading, error}= useAxiosGet();


    useEffect(() => {
        const id = localStorage.getItem("Marketfy_ActiveUser");
        if(!isNaN(id) && id !== 0){
            const url = `http://localhost:8080/ordersByUserId?userId=${id}`
            fetchData(url, setttt )
        }
        
    }, []);
    function setttt(response){
        setDbData(response.data);
        setData(response.data)
    }

    function getData(input) {
        let search = input.searchText.toLowerCase().replace(/\s+/g, '');

        const filtered = data.orders.filter((order)=>order.orderId.toString().includes(search))
        if (filtered.length>0){
            const newData = {
                userOrders: filtered.length, 
                orders: filtered
            }
            setData(newData)
            console.log("new Data", newData);
        }

    }

    return (
        <>
        <h1>Orders</h1>

        <div>
            <div style={{ position: "relative" }} >
                {error ?
                    <Error></Error>
                    :
                    <>
                        {loading ?
                            <Loader></Loader>
                            :
                            <>
                                <p>{data.userOrders} orders found</p>
                                <Searchbar returnThis={getData} radio={false} ></Searchbar>
                                <button onClick={()=>setData(dbData)} >Clear Search</button>
                                {data.orders.length>0?
                                        <div style={{ display: "flex" }} >
                                            {data.orders.map((order) =>
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
                            </>
                        }
                    </>
                }

            </div>

            <Link to='/home'>Shop</Link>. 
        </div>

        </>
    )
}
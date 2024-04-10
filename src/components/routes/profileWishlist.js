import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { convert2Book } from "../../utils/utils";
import BrowseCard from "../reusable/browseCard";

export default function ProfileWishlist(){

    const [dbData, setDbData] = useState([]);

    useEffect(() => {
        const id = localStorage.getItem("Marketfy_ActiveUser");
        const url = `http://localhost:8080/wishlistByUser?id=${id}`
        axios.get(url)
        .then( response => {
            console.log("Response Data: ", response.data);
            setDbData(convert2Book(response.data))
            // setDbData(addQtytoData(response.data, cartObj))
        })
        
    }, []);

    console.log("vetga", dbData);
    return (
        <>
        <h1>Wishlist</h1>
        
        {dbData.length>0?
            <div style={{display:"flex"}} >
            {dbData.map((book, index)=>
            <>
            <button>x</button>
            <BrowseCard book={book} key={index}></BrowseCard>
            </>
            )}
            </div>
        : 
            <div>
                <h2>Uh oh!</h2>
                <h4>Your list is empty.</h4>
            </div>
        }
        <h4>You can add books to this list in the  
        <Link to='/home'>Shop</Link>. </h4>

        </>
    )
}
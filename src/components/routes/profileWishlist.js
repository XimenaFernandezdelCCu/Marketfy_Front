import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import BrowseCard from "../reusable/browseCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { handleDeletefromWishlist } from "../../utils/utils";

export default function ProfileWishlist() {

    const [dbData, setDbData] = useState([]);

    useEffect(() => {
        const id = localStorage.getItem("Marketfy_ActiveUser");

        if (!isNaN(id) && id !== 0) {
            const url = `http://localhost:8080/productsInWishlistByUserId?id=${id}`

            axios.get(url)
                .then(response => {
                    console.log("Response Data: ", response.data);
                    setDbData(response.data)
                    // setDbData(addQtytoData(response.data, cartObj))
                }).catch(function (error) {
                    console.log("eeeeeeeeeeerrorrrrrrrrrr")
                    setDbData([]);
                })
        }

    }, []);

    return (
        <>
            <h1>Wishlist</h1>

            {dbData.length > 0 ?
                <div style={{ display: "flex" }} >
                    {dbData.map((book) =>
                        <div key={book.productId}>
                            <button
                                onClick={() => handleDeletefromWishlist(book.wishlistId, dbData, setDbData)}
                            >
                                <FontAwesomeIcon icon={faTrash} size={"xs"} />
                            </button>
                            <BrowseCard book={book.product}></BrowseCard>
                        </div>
                    )}
                </div>
                :
                <div>
                    <h2>Uh oh!</h2>
                    <h4>Your list is empty.</h4>
                </div>
            }
            <h4>You can add books to this list in the
                <Link to='/'>Shop</Link>. </h4>

        </>
    )
}
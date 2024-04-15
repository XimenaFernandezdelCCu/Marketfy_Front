import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BrowseCard from "../reusable/browseCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { handleDeletefromWishlist } from "../../utils/utils";
import { useAxiosGet } from "../../hooks/useAxiosGet";
import Error from "../reusable/error";
import Loader from "../reusable/loader";

export default function ProfileWishlist() {
    const {fetchData, loading, error}= useAxiosGet();
    const [dbData, setDbData] = useState([]);

    useEffect(() => {
        const id = localStorage.getItem("Marketfy_ActiveUser");

        if (!isNaN(id) && id !== 0) {
            const url = `http://localhost:8080/productsInWishlistByUserId?id=${id}`
            fetchData(url, setttt);
        }


    }, []);

    function setttt(response){
        if (Array.isArray(response.data)){
            setDbData(response.data);
        }
    }
    console.log("dbData: ", dbData);

    return (
        <>
            <h1>Wishlist</h1>

            <div className="relative"  >
                {error?
                    <Error></Error>
                :
                    <>
                    {loading? 
                        <Loader></Loader>
                    :
                    <>
                    
                    {dbData.length > 0 ?
                        <div className="flex wrapp" >
                            {dbData.map((book, index) =>
                                <div key={index} className="greyContainer rounded"
                                style={{
                                    maxWidth: "25%",
                                    minWidth: "300px", 
                                    // maxHeight: "90vh",
                                    margin: "1%",
                                    // padding: "2%",
                                }}
                                >
                                    <button
                                        onClick={() => handleDeletefromWishlist(book.wishlistId, setDbData)}
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
                    </>
                    }
                    </>
                }

            </div>

            <h4>You can add books to this list in the
                <Link className="right link" to='/'>Shop</Link> </h4>

        </>
    )
}
import { useEffect, useContext, useState } from "react";
import { HomeContext } from "../../context/homeContext";
import { useAxiosPost } from "../../hooks/useAxiosPost";
import { useAxiosGet } from "../../hooks/useAxiosGet";
import { paginationArray, handleDeletefromWishlist } from "../../utils/utils";
import { useSelector } from "react-redux"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'

//components
import Searchbar from "../reusable/searchbar";
import Pagination from "../reusable/pagination";
import BrowseCard from "../reusable/browseCard";
import Loader from "../reusable/loader";
import Error from "../reusable/error";

export default function Browse({modal}){
    const reduxAuth = useSelector((state) => state.auth);
    const isAuthenticated = reduxAuth.auth;
    const userId = isAuthenticated ? reduxAuth.id : null;

    const navigate = useNavigate();
    const { postData } = useAxiosPost();    
    const { fetchData, loading, error } = useAxiosGet();
    const { fetchData: fetchDataWishlist, loading: loadingWishlist, error: errorWishlist } = useAxiosGet();
    const {data, setData, page, setFound}= useContext(HomeContext);
    const [dbData, setDbData]= useState([]);
    const [wishlistItems, setWishlistItems] = useState([]);
    const url = "http://localhost:8080/products";
    
    useEffect(() => {
        fetchData(url, (response)=>{
            setDbData(response.data);
            setFound(response.data.length);
            setData(paginationArray(response.data.sort(()=>Math.random()-.5)))
        });

        if (userId) {
            const url = `http://localhost:8080/productsInWishlistByUserId?id=${userId}`
            fetchDataWishlist(url, (response)=>{
                if (Array.isArray(response.data)){
                    setWishlistItems(response.data);
                }
            });
        }

    }, []);

  
    /*because this is a small app, i will fetch all products data 
    and filter in the front. But if the data was extensive, i would 
    make requests depending on the search params. */
    function getData(input) {
        let search = input.searchText.toLowerCase().replace(/\s+/g, '');
        let data = dbData;
        let filtered;

        if (data.length>0){
            switch (input.searchBy) {
                case 'author':
                    filtered = data.filter((item) => {
                        return item.author.toLowerCase().replace(/\s+/g, '').includes(search);
                    })
                    break;
                case 'price':
                    search = search.replace(/\D/g, "");
                    filtered = data.filter((item) => {
                        return item.price < search;
                    })
    
                    break;
                default: 
                    filtered = data.filter((item) => {
                        return item.title.toLowerCase().replace(/\s+/g, '').includes(search);
                    })
            }
            if (filtered.length < 1) {
                setFound([0]);
            } else {
                setFound([filtered.length]);
            }
            setData(paginationArray(filtered));
        }
    }

    function add2Wishlist(productId){
        const id = localStorage.getItem("Marketfy_ActiveUser");
        const url = "http://localhost:8080/wishlistItems";
        const wishItem = {
            "userId": id,
            "productId": productId
        }
        postData(url,wishItem, (response)=>{
            const newWishLink = response.data._links.self.href;
            const newWishID = parseInt(newWishLink.split("/").pop());
            const newWishlistItem = {
                wishlistId: newWishID, 
                product: {
                    productId: productId
                }
            }
            setWishlistItems((wishlistItems)=>[...wishlistItems, newWishlistItem] )
        })

        
    }


    return (
        <>
            <Searchbar returnThis={getData} radio={true}></Searchbar>

            <Pagination></Pagination>


            <div className="flex wrapp greyContainer rounded"
            
            style={{
            position:"relative", 
            minHeight: "20vh", 
            justifyContent:"space-around"}}>

                {error ?
                    <Error></Error>  
                :
                <>
                {loading ? 
                    <Loader></Loader>
                    : data[0] ?
                    data[page].map((book, index)=>
                    <BrowseCard book={book} key={book.productId}>
                        {isAuthenticated?
                        <> 
                        {wishlistItems.map((item)=>item.product.productId).includes(book.productId)?
                            <button
                            // remove from wishlist 
                            onClick={()=>handleDeletefromWishlist(
                                wishlistItems.find((item)=>item.product.productId ==book.productId).wishlistId, 
                                setWishlistItems)}
                            >
                                <FontAwesomeIcon icon={solidHeart} />
                            </button>

                        :
                            <button
                            // add to wishlist 
                            onClick={()=>add2Wishlist(book.productId)}
                            >
                                <FontAwesomeIcon icon={regularHeart} />
                            </button>
                        
                        }
                        </>
                        :
                        <button
                            // ask to log in to add to wishlist
                            onClick={modal}
                        >
                            <FontAwesomeIcon icon={regularHeart} />
                        </button>
                        }

                        <div>
                            <button onClick={()=>navigate(`/products/${book.productId}`)}  >See More Details</button>
                        </div>

                    </BrowseCard>
                    )
                    :
                    <div>
                        <h2>Uh oh!</h2>
                        <h4>Your search didn't match any items.<br /> Please try again. </h4>
                    </div>
                }
                </>
                }

            </div>

            <Pagination></Pagination>


        </>
    )
}
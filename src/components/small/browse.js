import { useEffect, useContext, useState } from "react";
import { HomeContext } from "../../context/homeContext";
import { useAxiosPost } from "../../hooks/useAxiosPost";
import { useAxiosGet } from "../../hooks/useAxiosGet";
import { paginationArray, handleDeletefromWishlist } from "../../utils/utils";
import { useSelector } from "react-redux"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHeart} from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
//components
import Searchbar from "../reusable/searchbar";
import Pagination from "../reusable/pagination";
import BrowseCard from "../reusable/browseCard";
import Loader from "../reusable/loader";
import Error from "../reusable/error";

export default function Browse(){
    const reduxAuth = useSelector((state) => state.auth);
    const isAuthenticated = reduxAuth.auth;
    const userId = isAuthenticated ? reduxAuth.id : null;

    const { postData } = useAxiosPost();
    const { fetchData, loading, error } = useAxiosGet();
    const {data, setData, page, setFound}= useContext(HomeContext);
    const [dbData, setDbData]= useState([]);
    const [wishlistItems, setWishlistItems] = useState([]);
    const url = "http://localhost:8080/products";
    // let wishlistItems=[];
    
    useEffect(() => {
        fetchData(url, handleConsumedbData);

        // const id = localStorage.getItem("Marketfy_ActiveUser");

        if (userId) {
            console.log("auth")
            const url = `http://localhost:8080/productsInWishlistByUserId?id=${userId}`
            fetchData(url, setttt);
        }

    }, []);

    function setttt(response){
        // console.log("wish ids: ", response.data.map((item)=>item.product.productId) )
        setWishlistItems(response.data);
    }


    function handleConsumedbData(response){
        setDbData(response.data);
        setFound(response.data.length);
        setData(paginationArray(response.data.sort(()=>Math.random()-.5)))
    }


    /*because this is a small app, i will fetch all products data 
    and filter in the front. But if the data was extensive, i would 
    make requests depending on the search params. */
    function getData(input) {
        let search = input.searchText.toLowerCase().replace(/\s+/g, '');
        console.log("dbData search", dbData);
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
        if (!id|| id==false){
            console.log("building.....")
    
        } else {
            console.log("adding to wish")
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
                console.log("AAa", [...wishlistItems, newWishlistItem] )
                setWishlistItems((wishlistItems)=>[...wishlistItems, newWishlistItem] )
            })

        }
    }


    return (
        <>
            <Searchbar returnThis={getData}></Searchbar>

            <Pagination></Pagination>


            <div style={{
            borderStyle: "solid", 
            display: "flex", 
            flexWrap: "wrap", 
            position:"relative", 
            minHeight: "20vh"}}>

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
                                // nothing or remove from wishlist

                                onClick={()=>handleDeletefromWishlist(
                                    wishlistItems.find((item)=>item.product.productId ==book.productId).wishlistId, 
                                    setWishlistItems)}
                                >
                                    <FontAwesomeIcon icon={solidHeart} />
                                </button>

                            :
                                <button
                                onClick={()=>add2Wishlist(book.productId)}
                                >
                                    <FontAwesomeIcon icon={regularHeart} />
                                </button>
                            
                            }
                            </>
                            :
                            <button
                                // ask to log in to add to wishlist
                                onClick={()=>console.log("not user")}
                            >
                                <FontAwesomeIcon icon={regularHeart} />
                            </button>
                            }

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


        </>
    )
}
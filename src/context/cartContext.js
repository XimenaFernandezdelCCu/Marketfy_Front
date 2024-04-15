import { createContext, useState, useEffect } from "react";
import axios from "axios"
import { validateRawCart, countOccurrences, cleanRawCart } from "../utils/utils";
// Redux 
import { useSelector, useDispatch } from "react-redux"
import { useAxiosGet } from "../hooks/useAxiosGet";

const CartContext = createContext();

export function CartProvider ({children}){
    const dispatch = useDispatch();
    // state & variable declaration 
    const {fetchData, loading,  error,} = useAxiosGet();
    const [dbData, setDbData] = useState([]);
    const [checkout, setCheckout]= useState(false);
    let cartLength =[];
    let cartObj=[];
    let ids=[]; 
    let completeBook=[];
    let total; 

    // get cart from redux 
    const rawCart = useSelector((state) => state.cart);
    // validate & get ids and obj
    if (validateRawCart(rawCart, dispatch)) {
        cartLength = cleanRawCart(rawCart).length;
        cartObj = countOccurrences(rawCart);
        ids = cartObj.map((obj) => obj.id);
    } 

    useEffect(() => {
        if(ids.length>0 ){
            const url = `http://localhost:8080/products/byIDs?ids=${ids}`
            fetchData(url, setttt);
        }
    }, []);

    function setttt(response){
        setDbData(response.data);
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
        completeBook = dbData.map((book)=>{ 
            return {...book, qty: cartObj.find((it)=>it.id==book.productId).qty} }
        )
        total = ids.map((id)=>{
            return ((dbData.find((it)=>it.productId==id).price * cartObj.find((it)=>it.id==id).qty))
        }).reduce((acc,val)=>acc+parseFloat(val),0).toFixed(2)
    }
   

    return(
        <CartContext.Provider value={{
        dbData,
        setDbData,
        cartObj,
        completeBook,
        ids,
        cartLength, 
        total, 
        checkout,
        setCheckout,
        loading, 
        error 
        }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;
export {CartContext};
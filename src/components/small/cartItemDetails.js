import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBookOpen } from "@fortawesome/free-solid-svg-icons"
import { useDispatch } from "react-redux"
import { add2Cart, removeFromCart } from "../../utils/utils"

export default function CartbookDetails({dbData, cartObj}){
    const dispatch = useDispatch();

    // function handleAdd2Cart(id){
    //     add2Cart(book.productId, dispatch);


    // }

    return (
        <ol>
        {dbData.map((book, index)=>
            <li 
            style={{display:"flex", justifyContent:"space-evenly"}}
            key={book.productId}>

                <FontAwesomeIcon icon={faBookOpen}/>
                <h4>{book.author}'s {book.title}</h4>
                <h4>{book.price} $</h4>

                <div style={{display:"flex"}}>
                    <button 
                    onClick={()=>{removeFromCart(book.productId, dispatch)}}
                    >-</button>
                    <p>{cartObj.find((it)=>it.id==book.productId).qty}</p>
                    <button 
                    onClick={()=>{add2Cart(book.productId, dispatch)}}
                    >+</button>
                </div>
                
                <h4>total 
                    {(book.price*cartObj.find((it)=>it.id==book.productId).qty).toFixed(2)} 
                </h4>


            </li>
        
        )}
        </ol>
    )
}
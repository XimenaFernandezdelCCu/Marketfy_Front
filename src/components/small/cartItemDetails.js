import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBookOpen } from "@fortawesome/free-solid-svg-icons"
import { useDispatch } from "react-redux"
import { CartContext } from "../../context/cartContext"
import { useContext } from "react"
import { add2Cart, removeFromCart } from "../../utils/utils"

export default function CartbookDetails(){
    const {completeBook}= useContext(CartContext);
    const dispatch = useDispatch();

    return (
        <ol>
        {completeBook.map((book, index)=>
            <li className="flex justifyEvenly wrapp"
            key={book.productId}>

                <FontAwesomeIcon icon={faBookOpen}/>
                <div className="right" >
                    <h4>{book.author}'s {book.title}</h4>
                </div>
                
                <h4>{book.price} $ each</h4>

                <div className="flex"
                >
                    <button 
                    onClick={()=>{removeFromCart(book.productId, dispatch)}}
                    >-</button>
                    <p>{book.qty}</p>
                    <button 
                    onClick={()=>{add2Cart(book.productId, dispatch)}}
                    >+</button>
                </div>
                
                <h4 >total :
                    {(book.price*book.qty).toFixed(2)} 
                </h4>


            </li>
        
        )}
        </ol>
    )
}
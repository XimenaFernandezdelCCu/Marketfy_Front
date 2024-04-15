import { useContext } from "react"
import { CartContext } from "../../context/cartContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBookOpen } from "@fortawesome/free-solid-svg-icons"

export default function OrderDetails() {
    const {completeBook, total, setCheckout, cartLength}= useContext(CartContext);


    return (
        <div className="greyContainer rounded m3" 
        style={{ minWidth: "270px"}} >

            <h2>Order Details</h2>
            <ul>
                {/* <li>name's order</li> */}
                <li>{cartLength} Items:</li>
                <li>
                    {completeBook.map((book) =>
                        <div
                            className="flex justifyEvenly wrapp"
                            key={book.productId}>

                            <FontAwesomeIcon className="right" icon={faBookOpen} />
                            {book.qty>1?
                            <p >{book.qty} Copies of: </p>
                            :
                            <p >{book.qty} Copy of: </p>
                            }
                            <p>{book.author}'s {book.title}</p>
                        </div>
                    )}
                </li>
                <li>Total: {total}</li>
            </ul>
        </div>
    )
}
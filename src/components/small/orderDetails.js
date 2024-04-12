import { useContext } from "react"
import { CartContext } from "../../context/cartContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBookOpen } from "@fortawesome/free-solid-svg-icons"

export default function OrderDetails() {
    const {completeBook, total, setCheckout, cartLength}= useContext(CartContext);


    return (
        <div>
            <h2>Order Details</h2>
            <ul>
                <li>name's order</li>
                <li>{cartLength} Items:</li>
                <li>
                    {completeBook.map((book, index) =>
                        <div
                            style={{ display: "flex", justifyContent: "space-evenly" }}
                            key={book.productId}>

                            <FontAwesomeIcon icon={faBookOpen} />
                            <p>{book.qty} Copies of: </p>
                            <p>{book.author}'s {book.title}</p>
                        </div>
                    )}
                </li>
                <li>Total: {total}</li>
            </ul>
        </div>
    )
}
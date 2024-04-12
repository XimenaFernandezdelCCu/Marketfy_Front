import Cart from "./cart"
import CartProvider from "../../context/cartContext"

export default function Sales(){
    
    return (
        <CartProvider>
            <Cart></Cart>
        </CartProvider>
      
    )
}
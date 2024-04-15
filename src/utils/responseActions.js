// Functions to run after data has been fecthed 

import { authActions } from "../store";
import { emptyCart } from "./utils";


// -- Log in 
export function loginAction(response) {
    // local
    localStorage.setItem("Marketfy_ActiveUser", response.data.id);
    localStorage.setItem("Marketfy_ActiveUser_Details", JSON.stringify({
        first: response.data.first,
        preferred: response.data.preferred
    }));
    // redux
    const auth = {
        auth: true, 
        id: response.data.id, 
        first: response.data.first,
        preferred: response.data.preferred
    }
    // Redirect 
    // navigate('/');
    window.location.href = '/'
}

// -- Log out 
export function logoutAction(dispatch){
    localStorage.removeItem("Marketfy_ActiveUser");
    localStorage.removeItem("Marketfy_ActiveUser_Details");
    localStorage.removeItem("Marketfy_Cart");
    dispatch(authActions.setAuth({auth: false}));
    window.location.href = '/'
}

// -- Signup 
export function createAccountAction(response, navigate){
    // Retrieve New User Id
    const newAccountLink = response.data._links.self.href;
    const newAccountID = newAccountLink.split("/").pop();
    localStorage.setItem("Marketfy_NewUser", newAccountID);
    
    //Go to extra details
    navigate('/auth/extraDetails')
}

// -- Create Order
// export function createOrderAction(response){
//     const newOrderLink = response.data._links.order.href;
//     const newOrderID = newOrderLink.split("/").pop();
//     addItems2Order(newOrderID);

// }

// -- add items to order 
export function AddItems2OrderAction(response, dispatch){
    emptyCart(dispatch)
    window.location.href="/profile/orders"
}


import {createSlice, configureStore} from '@reduxjs/toolkit'

let localStoreUser = localStorage.getItem("Marketfy_ActiveUser");
let initialAuth;
if(JSON.parse(localStoreUser) == false || !localStoreUser ){
    initialAuth = {auth: false};
} else {
    let localStoreUserDets = JSON.parse(localStorage.getItem("Marketfy_ActiveUser_Details"));
    initialAuth = {
        auth: true, 
        id: localStoreUser, 
        first: localStoreUserDets.first,
        preferred: localStoreUserDets.preferred
    }
}


const authSlice = createSlice({
    name: 'auth', 
    initialState: initialAuth, 
    reducers: {
        setAuth(state, action){
            state=action.payload;
        }
        // ,
        // login(state, action) {
        //     state = { ...action.payload };
        // }, 
        // logout(state){
        //     state.auth=false;
        // }, 
        // include(state, action){
        //     state.auth = true;
        //     const {key, value} = action.payload;
        //     state.userDetails={...state.userDetails, [key]: value }
        // }
    }
});

let localStoreCart = localStorage.getItem("Marketfy_Cart");
let initial; 

if(localStoreCart != null){
    const cartArr = localStoreCart.split(',').map(Number);
    initial = cartArr;
    // initial = countOccurrences(cartArr)
} else {
    initial = []
}

// console.log("-----------REDUX: ");
// console.log("initial: ", initial);
// console.log("-----------REDUX ");

const cartSlice = createSlice({
    name: 'cart', 
    initialState:initial,
    reducers: {
        add2Cart(state, action){
            // const existingItem = state.find((item)=>item.id == action.payload);
            // if(!existingItem){
            //     state.push({id: action.payload, qty: 1})
            // } else {
            //     existingItem.qty++;
            // }
            state.push(action.payload)
        }, 
        removeFromCart(state, action){
            // const existingItem = state.find((item)=>item.id == action.payload);
            // if(existingItem){
            //     if(existingItem.qty <= 1 || !existingItem.qty){
            //         state = state.filter((item)=>item.id!=action.payload)
            //     } else {
            //         existingItem.qty--;
            //     }
                
            // }
            const index = state.indexOf(action.payload);
            const existingArr = state;
            existingArr.splice(index,1);
            state = existingArr;
            
            // state = state.filter((num)=> num !== action.payload);

        },
        removeAllFromCart(state){
            state=[];
        }, 
        setCart(state, action){
            state=action.payload;
        }
        
    }
})

// const wishSlice = createSlice({
//     name: 'wish', 
//     initialState: [], 
//     reducers: {
//         // Meant to receive only the key for the item. 
//         add2Wishlist(state, action){
//             const existingItem = state.find(item => item === action.payload);
//             if (!existingItem) {
//                 state.push(action.payload);
//             }
//         }, 
//         removeFromWishlist(state, action){
//                 const indexToRemove = state.indexOf(action.payload);
//                 if (indexToRemove !== -1) {
//                     state.splice(indexToRemove, 1);
//                 }
//         }, 
//         setWishlist(state, action){
//             console.log("innn")
//             return action.payload;
//         }, 
//         deleteWishlist(state){
//             return []
//         }
//     }
// })

// const ordersSlice = createSlice({
//     name: "orders", 
//     initialState: [], 
//     reducers: {
//         createOrder(state, action){
//             state.push(action.payload)
//         }, 
//         setOrders(state, action){
//             state=action.payload;
//         }

//     }
// })

const store = configureStore({
    reducer: {
        auth: authSlice.reducer, 
        cart: cartSlice.reducer, 
        // wish: wishSlice.reducer, 
        // orders: ordersSlice.reducer
    }
})

export const authActions = authSlice.actions;
export const cartActions = cartSlice.actions;
// export const wishActions = wishSlice.actions;
// export const ordersActions = ordersSlice.actions;
export default store;
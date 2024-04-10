import { cartActions } from "../store";

// export function getCookie(name) {
//     const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
//     return cookieValue ? cookieValue.pop() : '';
// }

//-----------------------------
// creates an array to handle pagination
// everytime you import it : *
export function paginationArray(data, num = 9) {
    let arr = [];
    for (let i = 0; i < Math.ceil(data.length / num); i++) {
        let it = data.slice(i * num, (i * num) + num);
        arr.push(it);
    }
    return arr;
};

//-----------------------------
// Cart *
export function add2Cart(id, dispatch){
    if (id!=0){
        let cart=[];
        const existing = localStorage.getItem("Marketfy_Cart");
        if(existing == null){
            localStorage.setItem("Marketfy_Cart", id);
        }else {
            cart.push(existing, id)
            localStorage.setItem("Marketfy_Cart", cart);
        }
        dispatch(cartActions.add2Cart(id));
    }
}

export function removeFromCart(id, dispatch){
    console.log("remove")
    let cart=[];
    let existing = localStorage.getItem("Marketfy_Cart");
    console.log("Existing", existing);
    
    if(existing != null && existing.includes(id)){
      
            console.log("id", id)
            const existingArr = existing.split(',').map(Number);
            console.log("existing: ", existingArr);
            const index = existingArr.indexOf(id)
            console.log("index: ", index);
            existingArr.splice(index,1);
            cart = existingArr;
        
        localStorage.setItem("Marketfy_Cart", cart);
        dispatch(cartActions.removeFromCart(id));
    }

}

// creates an object with keys id: and qty: based on 
// the cart info from local (an array with id's)
export function countOccurrences(arr) {
    if (!Array.isArray(arr)){
        arr = arr.split(',').map(Number);
    }

    const result = [];
    const countMap = {};

    arr.forEach(num => {
        if (countMap[num]) {
            countMap[num]++;
        } else {
            countMap[num] = 1;
        }
    });

    for (const id in countMap) {
        result.push({ id: parseInt(id), qty: countMap[id] });
    }

    return result;
};

// adds the field Qty and ItemTotal to the books array 
export function addQtytoData(dbData, cartObj) {
    const qtyMap = {};
    for (const item of cartObj) {
        qtyMap[item.id] = item.qty;
    }
    for (const item of dbData) {
        const qtyToAdd = qtyMap[item.productId];
        const qty = qtyToAdd;
        const itemTotal = (item.price * qty).toFixed(2);
        item.qty = qty;
        item.itemTotal = itemTotal;
    }
    return dbData;
}

//-----------------------------
// DEV convert array into object of type book 
export function convert2Book(array) {
    return array.map((arr) => {
        const book = {
            product_id: arr[0],
            title: arr[1],
            author: arr[2],
            price: arr[3],
            image: arr[4],
            synopsis: arr[5],
            inventory: arr[6]
        };
        return book;
    });
}

//DEV convert array to object details 
export function convert2Details(array) {
    return array.map((arr) => {
        const book = {
            user_id: arr[0],
            email: arr[1],
            first: arr[2],
            last: arr[3],
            preferred: arr[4],
            bio: arr[5],
            tags: arr[6]
        };
        return book;
    });
}
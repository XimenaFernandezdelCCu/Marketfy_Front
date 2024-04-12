// ---- BROWSE
useEffect(() => {
    setLoading(true)
    axios.get(url)
    .then( response => {
        setLoading(false)
        setDbData(response.data);
        setFound(response.data.length);
        setData(paginationArray(response.data.sort(()=>Math.random()-.5)))
    }).catch(function (error){
        setLoading(false)
        console.log("----------------", error);
        setError(error.message);

    })

}, []);

// ---- Wishlist (utils fn)
export function add2Wishlist(productId){
    const id = localStorage.getItem("Marketfy_ActiveUser");
    if (!id|| id==false){
        console.log("building.....")

    } else {
        const url = "http://localhost:8080/wishlistItems";
        const wishItem = {
            "userId": id,
            "productId": productId
        }
        axios.post(url,wishItem)
        .then( response =>{
            console.log("Response Data: ", response);
        })
    }
}

// ---- Login (fn)
function handleLogin(event){
    event.preventDefault();
    //  Retrieve User Input: 
    const formData = new FormData(event.target);
    const user = {
        email : formData.get('loginEmail'), 
        pass : formData.get('loginPassword')
    }
    // const response = fetchData(url, user);
    
    axios.post(url, user)
    .then( response => {
        console.log("Response: ", response);
        if (response.status == 200){
            loginAction(response, navigate)
        }
    }).catch(error => {
        console.error("Oh no!", error)
    }); 
}   

// ---- SignUp (fn)
function handleSignup(event) {
    event.preventDefault();
    //  Retrieve User Input: 
    const formData = new FormData(event.target);
    const email = formData.get('signupEmail');
    const password = formData.get('signupPass');
    const newUser = {
        email: email,
        pass: password,
        first: formData.get('signupFirst'),
        last: formData.get('signupLast'),
        role: "user",
        active: false
    }
    //Send request
    fetchData(url, newUser, createAccountAction);
    // navigate('/auth/extraDetails')
}

// ---- Cart Products (cartContext)
useEffect(() => {
    if(ids.length>0 ){
        const url = `http://localhost:8080/products/byIDs?ids=${ids}`

        axios.get(url)
        .then( response => {
            console.log("Response Data: ", response.data);
            setDbData(response.data)
            // setDbData(addQtytoData(response.data, cartObj))
        })
    }
}, []);

// ---- CHECKOUT:  Order (fn)
function generateOrder() {
    showLoader()
    const id = localStorage.getItem("Marketfy_ActiveUser");

    if (!isNaN(id) && id !== 0){
        const url = "http://localhost:8080/orders";
        const order = {
            userId: id,
            totalItems: cartLength,
            total: total,
            orderDate: new Date().toISOString()
        }
        console.log("order-- ", JSON.stringify(order));
        axios.post(url, order)
        .then(response => {
            console.log("Response: ", response);
            const newOrderLink = response.data._links.order.href;
            const newOrderID = newOrderLink.split("/").pop();
            console.log(newOrderID);
            addItems2Order(newOrderID);
            // if (response.status == 200){
            //     localStorage.setItem("Marketfy_ActiveUser", response.data);
            //     navigate('/');
            // }
        }).catch(error => {
            console.error("Oh no!", error)
        }); 

        
        
    }
}

// ---- OrderItems (fn)
function addItems2Order(orderId){
    const url = "http://localhost:8080/AddOrderItems";
    const orderItems = {
        orderId: orderId, 
        items: cartObj.map((it)=>{return {
            productId: it.id,
            qty: it.qty
        }})
    }
    axios.post(url, orderItems)
    .then(response => {
        console.log("Response: ", response);
        emptyCart(dispatch)
        navigate('/profile/orders');
        // navigate('/');
        // if (response.status == 200){
        //     localStorage.setItem("Marketfy_ActiveUser", response.data);
        // }
    }).catch(error => {
        console.error("Oh no!", error)
    });
    
}

// ---- Profile User Details 
// useEffect(() => {
//     const id = localStorage.getItem("Marketfy_ActiveUser");
//     if (Number.isInteger(id) && id !== 0){
//         const url = `http://localhost:8080/userDetails?id=${id}`
//     axios.get(url)
//     .then( response => {
//         console.log("Response Data: ", response.data);
//         setDbData(response.data)
//     })
//     }  
// }, []);
// -------------- this is the slice one!!!
useEffect(() => {
    const id = localStorage.getItem("Marketfy_ActiveUser");
    if (!isNaN(id) && id !== 0){
        const url = `http://localhost:8080/userDetails?id=${id}`
    axios.get(url)
    .then( response => {
        console.log("Response Data: ", response.data);
        setDbData(response.data.slice(1))
    })
    }  
}, []);

// EDit Profile (fn)
function handleEditDetails(event){
    event.preventDefault();
    const id = localStorage.getItem("Marketfy_ActiveUser");
    const url = `http://localhost:8080/editUserDetails`;
    const formData = new FormData(event.target);
    const editedDetails = {
        id: id,
        first : formData.get(detailName[0]), 
        last : formData.get(detailName[1]),
        preferred: formData.get(detailName[2]),
        bio : formData.get(detailName[3])
        // tags : formData.get(detailName[4])
    }
    console.log("edits: ", editedDetails);
    axios.post(url, editedDetails)
    .then( response => {
        console.log("Response: ", response);
        // if (response.status == 200){
        //     localStorage.setItem("Marketfy_ActiveUser", response.data);
        //     navigate('/');
        // }
        navigate('/profile/');
    }).catch(error => {
        console.error("Oh no!", error)
    }); 
}


// ---- Wish 
useEffect(() => {
    const id = localStorage.getItem("Marketfy_ActiveUser");

    if (!isNaN(id) && id !== 0) {
        const url = `http://localhost:8080/productsInWishlistByUserId?id=${id}`

        axios.get(url)
            .then(response => {
                console.log("Response Data: ", response.data);
                setDbData(response.data)
                // setDbData(addQtytoData(response.data, cartObj))
            }).catch(function (error) {
                console.log("eeeeeeeeeeerrorrrrrrrrrr")
                setDbData([]);
            })
    }

}, []);

// ---- Delete from wish 
export function handleDeletefromWishlist(id, dbData, setDbData){
    const url = `http://localhost:8080/wishlistItems/${id}`
    axios.delete(url)
    .then( response => {
        console.log("Response Data: ", response);
    })
    setDbData((dbData)=>dbData.filter((item)=>item.wishlistId != id));
}

// ---- get Orderds
useEffect(() => {
    const id = localStorage.getItem("Marketfy_ActiveUser");
    if(!isNaN(id) && id !== 0){
        const url = `http://localhost:8080/ordersByUserId?userId=${id}`

        axios.get(url)
        .then( response => {
            console.log("Response Data: ", response.data);
            setDbData(response.data)
            // setDbData(addQtytoData(response.data, cartObj))
        }).catch(function (error){
            console.log("eeeeeeeeeeerrorrrrrrrrrr")
            setDbData([]);
        })
    }
    
}, []);
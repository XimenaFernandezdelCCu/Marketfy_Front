import { useState, useEffect } from "react"
import axios from "axios";

//components
import ProfileDetails from "./profileDetails";
import ProfileEdit from "./profileEdit";
import ProfileWishlist from "./profileWishlist";
import ProfileOrders from "./profileOrders";

export default function Profile(){
    const [dbData, setDbData] = useState([]);
    const [profileOption, setProfileOption] = useState('details');
    let displayDetails;
    let editableDetails;
    let interests;

    useEffect(() => {
        const id = localStorage.getItem("Marketfy_ActiveUser");
        const url = `http://localhost:8080/userDetails?id=${id}`
        axios.get(url)
        .then( response => {
            console.log("Response Data: ", response.data);
            setDbData(response.data)
        })
        
    }, []);

    return (
        <div>
            <div>
                <h1>Avatar</h1>
                <ul>
                    <li onClick={()=>setProfileOption('details')} >User Details</li>
                    <li onClick={()=>setProfileOption('edit')}>Edit Profile</li>
                    <li onClick={()=>setProfileOption('wishlist')}>Wishlist</li>
                    <li onClick={()=>setProfileOption('orders')}>Order History</li>
                </ul>
            </div>
            <div>
                {profileOption === 'details' ?
                    <ProfileDetails dbData={dbData}
                    onClick={()=>setProfileOption('edit')}></ProfileDetails> 
                : profileOption === 'edit' ? 
                    <ProfileEdit dbData={dbData.slice(1)}></ProfileEdit>
                : profileOption === 'wishlist' ?
                    <ProfileWishlist></ProfileWishlist>
                : profileOption === 'orders' &&
                    <ProfileOrders></ProfileOrders>
                }

            </div>

        </div>
    )
}
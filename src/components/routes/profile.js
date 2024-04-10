import { useState } from "react"
//components
import ProfileDetails from "./profileDetails";
import ProfileEdit from "./profileEdit";
import ProfileWishlist from "./profileWishlist";
import ProfileOrders from "./profileOrders";

export default function Profile(){

    const [profileOption, setProfileOption] = useState('details');

    // function handlePushState(where){
    //     const url = `${window.location.pathname}/${where}`
    //     history.pushState(null,null, url);
    // }


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
                    <ProfileDetails></ProfileDetails> 
                : profileOption === 'edit' ? 
                    <ProfileEdit></ProfileEdit>
                : profileOption === 'wishlist' ?
                    <ProfileWishlist></ProfileWishlist>
                : profileOption === 'orders' &&
                    <ProfileOrders></ProfileOrders>
                }

            </div>

        </div>
    )
}
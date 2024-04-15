import { useState } from "react";
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux"
import { cartActions } from "../store";

export function useAxiosPost(){
    const navigate = useNavigate();
    const dispatch = useDispatch();

    
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(); 
    const [error, setError] = useState(false);

    // function wait() {
    //     setLoader(true);
    //     const timeout = setTimeout(() => {
    //         setLoader(false);
    //     }, 4000);
        

    //     return () => clearTimeout(timeout);
    // }


    function postData (url, body, handler){
        setLoading(true);
        //------------
        // const timeout = setTimeout(() => {  // -------------
            
            axios.post(url, body)
            .then( response => {
                setLoading(false);
                if(response.status >= 200 && response.status <300){
                    console.log("Response: ", response);
                    if(handler){
                        handler(response, navigate, dispatch);
                    }
                }
                // setData(response);
                
            }).catch(error => {
                setLoading(false);
                setError(error)
                console.error("Oh no!", error)
            }); 

        // }, 4000); // -------------
        // return () => clearTimeout(timeout); // -------------
    }

    return {
        postData, loading, error, data
    }
}
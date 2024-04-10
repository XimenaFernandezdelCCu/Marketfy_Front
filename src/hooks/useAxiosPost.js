import { useState } from "react";
import axios from "axios"

export function useAxiosPost(){
    
    const [loading, setLoading] = useState();
    const [data, setData] = useState(); 
    const [error, setError] = useState();

    function fetchData (url, body){
        setLoading(true);
        axios.post(url, body)
        .then( response => {
            setLoading(false);
            setData(response);
            console.log("Response: ", response);
            return response;
        }).catch(error => {
            setLoading(false);
            setError(error)
            console.error("Oh no!", error)
            return error;
        }); 
    }

    return {
        fetchData, loading, data, error
    }
}
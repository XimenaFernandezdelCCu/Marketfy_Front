import { useState } from "react";
import axios from "axios"


export function useAxiosGet(){
    
    const [loading, setLoading] = useState();
    const [data, setData] = useState(); 
    const [error, setError] = useState();

    function fetchData (url){
        setLoading(true);
        axios.get(url)
        .then( response => {
            setLoading(false);
            setData(response.data);
            console.log("Response Data: ", response.data);
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
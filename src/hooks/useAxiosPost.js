import { useState } from "react";
import axios from "axios"
import { useNavigate } from 'react-router-dom';

export function useAxiosPost(){
    const navigate = useNavigate();

    
    const [loading, setLoading] = useState();
    const [data, setData] = useState(); 
    const [error, setError] = useState();


    function fetchData (url, body, handler){
        setLoading(true);
        axios.post(url, body)
        .then( response => {
            setLoading(false);
            setData(response);
            console.log("Response: ", response);

            handler(response, navigate);
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
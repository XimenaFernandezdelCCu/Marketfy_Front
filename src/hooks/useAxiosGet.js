import { useState } from "react";
import axios from "axios"


export function useAxiosGet(){
    
    const [loading, setLoading] = useState();
    const [data, setData] = useState([]); 
    const [error, setError] = useState();

    function fetchData (url, handler){
        setLoading(true);
        
        // const timeout = setTimeout(() => {

        axios.get(url)
        .then( response => {
            console.log("Response Data: ", response.data);
            setLoading(false);
            setData(response.data);
            if(handler){
                handler(response);
            }
        }).catch(error => {
            setLoading(false);
            setError(error)
            setData([])
            console.error("Oh no!", error)
        }); 
        // }, 4000); // -------------
        // return () => clearTimeout(timeout);

    }

    // function setttt(response){
    //     setDbData(response.data);
    // }

    return {
        fetchData, loading,  error, data
    }
}
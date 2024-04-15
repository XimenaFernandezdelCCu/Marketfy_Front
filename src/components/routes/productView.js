import { useNavigate } from 'react-router-dom'
import { useAxiosGet } from '../../hooks/useAxiosGet';
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { add2Cart } from '../../utils/utils';
import { useDispatch } from 'react-redux';


export default function ProductView(){
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { fetchData, loading, error } = useAxiosGet();
    const [data, setData] = useState({});
    const {id} = useParams();
    const url = `http://localhost:8080/products/${id}`

    useEffect(() => {
        fetchData(url, (response)=>setData(response.data) );
    }, []);

    return (
        <>
        <button onClick={()=>navigate(`/`)}  >Back to shop</button>
        <h3>Product View</h3>
        <div>
            <div>
                IMAGE
            </div>
            <div>
                <h1>{data.author}'s {data.title}</h1>
                <p>{data.synopsis}</p>
                <ul>
                    <h3>Hardcover</h3>
                    <h3>November 14, 1998</h3>
                    <h3>756 Pages</h3>
                    <h3>Enlgish</h3>
                    <h3>Penguin Editorials</h3>
                </ul>
            </div>
        </div>
        
        <div>
            <h2>Current stock: {data.inventory}</h2>
            <button
                onClick={() => add2Cart(parseInt(data._links.self.href.split("/").pop()), dispatch)}
            ><FontAwesomeIcon icon={faCartPlus} /></button>
        </div>

       


        </>
    )
}
import { useNavigate } from 'react-router-dom'
import { useAxiosGet } from '../../hooks/useAxiosGet';
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { add2Cart } from '../../utils/utils';
import { useDispatch } from 'react-redux';
import anonymousBook from '../../imgs/anonymousBook.jpg'



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
        <div className='flex wrapp justifyEvenly greyContainer rounded '>

            <div style={{width:"30%"}}>   
                {/*---------- if product has image, display image, else, display placeholder */}
                {data.image ?
                    // <img src={`${book.image}`} style={{width:"100%"}} ></img>
                    <p>DB Image</p>
                    
                :
                    <img src={anonymousBook} style={{width:"100%"}} ></img>
                }
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
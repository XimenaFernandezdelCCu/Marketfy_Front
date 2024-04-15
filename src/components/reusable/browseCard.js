import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { add2Cart } from '../../utils/utils';
import { useDispatch } from 'react-redux';
import houseOfLeaves from '../../imgs/houseofleaves.jpg'

export default function BrowseCard({book, children}){
    const dispatch = useDispatch();

    return (
        <div className='orangeBorderCard rounded'
        style={{
            maxWidth: "27%",
            minWidth: "250px", 
            maxHeight: "90vh",
            margin: ".5%",
            padding: "2%",
            backgroundColor:"white"
        }} >


            {/* <img></img> */}
            <div 
            style={{width:"100%"}}
            >
                <img src={houseOfLeaves} style={{width:"100%"}} ></img>
            </div>

            <div className='flex'>
                <FontAwesomeIcon icon={faBookOpen} className='right' />
                <h4>{book.title}</h4>
            </div>

            <h5>{book.author}</h5>
            <h5>{book.price} $</h5>

            <div className='flex' style={{justifyContent: "space-between"}} >
                <button
                onClick={() => add2Cart(book.productId, dispatch)}
                ><FontAwesomeIcon icon={faCartPlus} />
                </button>

                {children}
            </div>


        </div>
    )
}
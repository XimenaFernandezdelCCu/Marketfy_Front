import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { add2Cart } from '../../utils/utils';
import { useDispatch } from 'react-redux';

export default function BrowseCard({book, children}){
    const dispatch = useDispatch();

    return (
        <div style={{
            borderStyle: "solid",
            width: "30%"
        }} >


            {/* <img></img> */}
            <FontAwesomeIcon icon={faBookOpen} />
            <h4>{book.title}</h4>
            <h5>{book.author}</h5>
            <h5>{book.price} $</h5>
            <button
                onClick={() => add2Cart(book.productId, dispatch)}
            ><FontAwesomeIcon icon={faCartPlus} /></button>
            {children}


        </div>
    )
}
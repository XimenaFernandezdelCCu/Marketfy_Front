
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { HomeContext } from '../../context/homeContext';
import { useContext, useEffect, useState } from 'react';

export default function Pagination(){
    const {found, page, setPage, data} = useContext(HomeContext);
    const [pages, setPages] = useState([])
    console.log("Pagination; ", data);

    useEffect(() => {
        setPages(Array.from({ length: Math.ceil(data.length) }, (_, index) => index + 1))
    }, [data]);

    console.log("pages: ", pages)
    return (
        <div>
            <h4>Found: {found} Books.</h4>
            <h4> Page: {page + 1} </h4>

            <div>
                {page > 0 ?
                    <button 
                        onClick={() => { setPage(page - 1) }} >
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                    :
                    <button >
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                }

                {
                    pages.map((page) =>
                        <button
                            key={page}
                            onClick={() => { setPage(page - 1) }}
                            >{page}</button>
                    )}

                {page !== pages.length - 1 ?
                    <button 
                        onClick={() => { setPage(page + 1) }} >
                        <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                    :
                    <button>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                }
            </div>

        </div>
    )
}
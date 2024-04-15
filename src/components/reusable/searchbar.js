import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';


export default function Searchbar ({returnThis, radio}) {

    const handleSearchbarInput = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
    
        const searchText = formData.get('searchText');
        const searchBy = formData.get('searchBy');
        returnThis({searchText, searchBy})
    };

    return (
        <div>

            <form
                id="searchbar"
                onSubmit={handleSearchbarInput}>

                {radio &&
                <div>
                    <p>Search By:</p>
                    <input name="searchBy" type='radio' id="radioTitle" value="title" defaultChecked></input>
                    <label htmlFor="radioTitle">Title</label>
                    <input name="searchBy" type='radio' id="radioAuthor" value="author"></input>
                    <label htmlFor="radioAuthor">Author</label>
                    <input name="searchBy" type='radio' id="radioPrice" value="price"></input>
                    <label htmlFor="radioPrice">Price</label>
                </div>
                }

                <input
                    type="text"
                    id="itemSearch" 
                    name="searchText" 
                    placeholder={`Search...`}
                />
                <button type="submit">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </form>

      </div>
    )

};
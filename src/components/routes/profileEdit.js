import FormInput from "../reusable/formInput"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function ProfileEdit({dbData}){
    const navigate = useNavigate();
    const detailName = ["First Name", "Last Name", "Preferred Name", "Bio", "Interest Tags"]
    
    function handleEditDetails(event){
        event.preventDefault();
        const id = localStorage.getItem("Marketfy_ActiveUser");
        const url = `http://localhost:8080/editUserDetails`;
        const formData = new FormData(event.target);
        const editedDetails = {
            id: id,
            first : formData.get(detailName[0]), 
            last : formData.get(detailName[1]),
            preferred: formData.get(detailName[2]),
            bio : formData.get(detailName[3])
            // tags : formData.get(detailName[4])
        }
        console.log("edits: ", editedDetails);
        axios.post(url, editedDetails)
        .then( response => {
            console.log("Response: ", response);
            // if (response.status == 200){
            //     localStorage.setItem("Marketfy_ActiveUser", response.data);
            //     navigate('/');
            // }
            navigate(0);
        }).catch(error => {
            console.error("Oh no!", error)
        }); 
    }
  
    
    return (
        <><h1>Edit</h1>
        <form id="editDetails" onSubmit={handleEditDetails}>
            {dbData.map((detail, index)=>
                
                <FormInput key={index}
                 name={detailName[index]} id={detailName[index]} value={detail} ></FormInput>
            )}
            <button
            type="submit" htmlFor={"editDetails"}
            >Save Changes</button>
        </form>
        </>
    )
}
//hook
import { useModal } from "../../hooks/useModal"
import { Link } from "react-router-dom";
//components
import Modal from "../reusable/modal";
import Browse from "../small/browse";
import HomeProvider from "../../context/homeContext";




export default function Home(){

    const  {showModal, setShowModal} = useModal();

    return (
        <HomeProvider>
          {showModal && 
          <Modal closeModal={()=>setShowModal(false)} >
            <h2>To add Items to a wishlist you need to be logged in.</h2>
            <button><Link to='/auth' className="HeaderLink" >Login</Link></button>
          </Modal> 
          }

          <h1 className="title" >HOME</h1>
          <Browse modal={()=>setShowModal(true)} ></Browse>
        </HomeProvider>
    )
}
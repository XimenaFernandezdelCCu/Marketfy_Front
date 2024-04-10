//hook
import { useModal } from "../../hooks/useModal"
//components
import Modal from "../reusable/modal";
import Browse from "../small/browse";
import HomeProvider from "../../context/homeContext";




export default function Home(){

    const  {showModal, setShowModal, modalData, setModalData} = useModal();

    return (
        <HomeProvider>
        {showModal && 
        <Modal closeModal={()=>{setShowModal(false)}} >
          <h2>hello modal</h2>
        </Modal> 
        }

        <h1>HOME</h1>
        <Browse></Browse>
        </HomeProvider>
    )
}
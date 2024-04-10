import { useState } from "react";

export function useModal(){
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState();

    return {showModal, setShowModal, modalData, setModalData}

}
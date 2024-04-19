import '../../style/modal.css'
export default function Modal (props) {
    return (
        <div 
        className="backdrop" 
        id="Modal"
        onClick={props.closeModal} >

            <div className="modal flexCol p3" >
                <button onClick={props.closeModal}>x</button>

                {props.children}
                
            </div>
        </div>
    )

}
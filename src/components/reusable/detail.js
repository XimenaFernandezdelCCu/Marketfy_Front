

// inputs: name, id, type, onblur
export default function Detail(props){

    // const style={
    //     display: "flex",
    //     justifyContent: "space-between",
    //     padding:" 0 5%", 
    //     marginBottom: "2%"
    // }

    return(
        <div>
            <div 
            // style={{display:"flex"}}
             >
                <label htmlFor={props.id}>
                    <h4>{props.name}</h4>
                </label>

                <p>{props.value}</p>
                {/* <input 
                name={props.id}
                id={props.id}
                onBlur={props.onblur}
                placeholder={props.name} 
                type={props.type}></input> */}
            </div>

            {props.children}
            <hr/>
        </div>
    )
}


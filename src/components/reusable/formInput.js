

// inputs: name, id, type, onblur, value, placeholder
export default function FormInput(props){

    // const style={
    //     display: "flex",
    //     justifyContent: "space-between",
    //     padding:" 0 5%", 
    //     marginBottom: "2%"
    // }

    return(
        <div>
            <div className="formInput" >
                <label htmlFor={props.id}>
                    <h4>{props.name}</h4>
                </label>
                <input 
                name={props.id}
                id={props.id}
                defaultValue={props.value}
                onBlur={props.onblur}
                placeholder={props.placeholder || props.name} 
                type={props.type}></input>
            </div>
            {props.children}
            <hr/>
        </div>
    )
}


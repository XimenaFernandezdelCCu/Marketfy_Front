import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseChimney } from '@fortawesome/free-solid-svg-icons'

import FormInput from "../reusable/formInput"

export default function Shipping() {
    return (
        <div className="greyContainer rounded m3" 
        style={{ minWidth: "270px"}} >

            <h2>Shipping Details</h2>
            <FontAwesomeIcon icon={faHouseChimney} />
            <form>
                <p>Credit / Debit Card</p>
                {/* // inputs: name(label), id, type, onblur, value, placeholder */}
                <FormInput name={"Adress"} placeholder={"542W Elm St."}  ></FormInput>
                <FormInput name={"City"} placeholder={"Denver"}  ></FormInput>
                <FormInput name={"State"} placeholder={"Colorado"} ></FormInput>
                <FormInput name={"Zip"} placeholder={"69 420"} ></FormInput>
                {/* <FormInput name={"Shipping Adress same as Billing"} type={"checkbox"} ></FormInput> */}
                <div style={{display:"flex"}} >
                    <input type="checkbox"></input>
                    <label><h4>Shipping Adress same as Billing</h4></label>
                </div>
                <hr />
            </form>
        </div>
    )
}
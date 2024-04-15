import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCreditCard } from '@fortawesome/free-solid-svg-icons'

import FormInput from "../reusable/formInput"

export default function Payment() {
    return (
        <div className="greyContainer rounded m3" 
        style={{ minWidth: "270px"}} >

            <h2>Payment Method</h2>
            <FontAwesomeIcon icon={faCreditCard} />
            <form>
                <p>Credit / Debit Card</p>
                {/* // inputs: name(label), id, type, onblur, value, placeholder */}
                <FormInput name={"Card Number"} placeholder={"**** **** **** ****"}  ></FormInput>
                <FormInput name={"Expiration Date"} placeholder={"MM / YY"}  ></FormInput>
                <FormInput name={"Security Code"} placeholder={"***"} type={"password"} ></FormInput>

            </form>
        </div>
    )
}

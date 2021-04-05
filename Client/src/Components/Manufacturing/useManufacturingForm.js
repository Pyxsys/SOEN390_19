import axios from "axios"
import { useState } from "react"

import config from '../../config.json'



/** [useManufacturingFrom.js.js]
* Summary.
* Functionality behind how the form works. 
* 
* Description. 
* Handlechange is used when a field changes, the states are used to store the values if there are no changes, set state is called
* when we want to change the state.
*/
const useManufacturingForm = () => {
    const [values, setValues] = useState(
        {
            internalId: '',
            quantity: ''
        }
    )

    const handleChange = e => {
        const {name, value} = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleSubmit = async () => {
        console.log("Attempting to manufacture bike")
        try{
            console.log("QUANTITY: ", values.quantity)
            const response = await axios.post(config.site_root_from_config+"/manufacturing/assemble", {
                internalId: values.internalId,
                quantity: parseInt(values.quantity)
            })
            console.log("Info sent for manufacturing request")
            console.log(response.data.message)
            return response;
        }catch (error){
            console.error(error)
        }
    }

    return {handleChange, handleSubmit, values}
}

export default useManufacturingForm


/** [usePartsForm.js]
* Summary.
* This page is how thee usePartsForm works. 
* 
* Description. 
* Handle submit, handle change are how the values are kept track of and then passed to the backend.
*/
import axios from "axios"
import { useState } from "react"

import config from '../../../config.json'



const usePartsForm = () => {
    const [partValues, setPartValues] = useState({
        internalId: '',
        partType: '',
        price: '',
        numberOfUnits: '',
        provider: '',
    })

    const handleChange = e => {
        const {name, value} = e.target
        setPartValues({
            ...partValues,
            [name]: value
        })
    }
    const handleSubmit = async () => {
        console.log("Attempting to add info")
        // addPartsInformation(values.partsList)
        try{
            const response = await axios.post(`http://localhost:5000/inventory/partinventory`,{
                internalId: partValues.internalId,
                partType: partValues.partType,
                price: partValues.price,
                provider: partValues.provider,
                numberOfUnits: partValues.numberOfUnits
            })
            console.log("info added to database")
            console.log(response)
            
        }catch(error){
            console.debug("Encountered an error tryin to add bike info")
            console.debug(error)
        }
    }

    return {handleChange, partValues, handleSubmit}
}

export default usePartsForm
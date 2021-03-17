/** [useAddInventory.js]
* Summary. 
This is for when the user clicks on the add inventory button. This will post the information to the back-end.
*
* Description. (Use periods)
After we choose what to be added onto the list,then we can click on the add and it will add information to backEnd.
Additionally, I will show us the status of the upload
*/
import axios from "axios"
import { useState } from "react"
import fetchRows from "./InventoryHome"

const useAddInventory = () => {

    const [values, setValues] = useState({
        internalId: '',
        type: '',
        price: '',
        partsList:'',
        numberOfUnits: '',
        provider: '',
    })
    
    
     /**
      * const handleChangeInput = (index,event) => {
        const results =[...values.partsList];
        results[index][event.target.name]=event.target.value;
        setValues(results);
    }
    */
    const handleChange = e => {
        const {name, value} = e.target
        setValues({
            ...values,
            [name]: value
        })
    }
    /** 
    const handleAddFields = () =>{
        setValues([values.partsList],{parInternalId:'',amountRequired:''})
    }
    */

    /** 
    const handleRemoveFields = (index) =>{
        const removed =[...values.partsList];
        removed.splice(index, 1);
        setValues(removed);
    }
    */

    const addPartsInformation = (stringToBeSplit) => {
        var partsAndQuanities = stringToBeSplit.split(", ")
        var partsArray = []
        for(var i=0; i<partsAndQuanities.length; i++){
            // create object
            var j = {partInternalId: partsAndQuanities[i], amountRequired: parseInt(partsAndQuanities[++i])}
            //add object to array
            partsArray.push(j)
        }      
        console.log("From addpartsInformation ", partsArray) 
        return partsArray

}

    const handleSubmit = async () => {
        console.log("Attempting to add info")
        // addPartsInformation(values.partsList)
        try{
            const response = await axios.post(`http://localhost:5000/inventory/bikeinventory`,{
                internalId: values.internalId,
                price: values.price,
                type: values.type,
                provider: values.provider,
                partsList: addPartsInformation(values.partsList),
                numberOfUnits: 1
            })
            console.log("info added to database")
            console.log(response)
            
        }catch(error){
            console.debug("Encountered an error tryin to add bike info")
            console.debug(error)
        }
    }

    return {handleChange, values, handleSubmit}
}

export default useAddInventory
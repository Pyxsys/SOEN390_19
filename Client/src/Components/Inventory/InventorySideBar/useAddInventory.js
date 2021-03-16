import axios from "axios"
import { useState } from "react"
import fetchRows from "./InventoryHome"
/*
this function is for when the user clicks on the add inventory button. This will post the information to the back-end.
*/
const useAddInventory = () => {

    const [values, setValues] = useState({
        internalId: '',
        type: '',
        price: '',
        partsList:[{partInternalId: '' , 
        amountRequired: ''}],
        numberOfUnits: '',
        provider: '',
    })
    
     const handleChangeInput = (index,event) => {
        const results =[...values.partsList];
        results[index][event.target.name]=event.target.value;
        setValues(results);
    }
    const handleChange = e => {
        const {name, value} = e.target
        setValues({
            ...values,
            [name]: value
        })
    }
    const handleAddFields = () =>{
        setValues([values.partsList],{parInternalId:'',amountRequired:''})
    }
    
    const handleRemoveFields = (index) =>{
        const removed =[...values.partsList];
        removed.splice(index, 1);
        setValues(removed);
    }

    const handleSubmit = async () => {
        console.log("Attempting to add info")
        try{
            const response = await axios.post(`http://localhost:5000/inventory/bikeinventory`,{
                internalId: values.internalId,
                price: values.price,
                type: values.type,
                provider: values.provider,
                partsList: [{
                partInternalId: values.partInternalId,
                amountRequired: values.amountRequired,
                }],
                numberOfUnits: 1
            })
            console.log("info added to database")
            console.log(response)
            
        }catch(error){
            console.debug("Encountered an error tryin to add bike info")
            console.debug(error)
        }
    }

    return {handleChange,handleChangeInput,handleAddFields,handleRemoveFields, values, handleSubmit}
}

export default useAddInventory
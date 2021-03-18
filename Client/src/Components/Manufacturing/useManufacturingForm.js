import axios from "axios"
import { useState } from "react"

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
            const response = await axios.post("http://localhost:5000/manufacturing/assemble", {
                internalId: values.internalId,
                quantity: parseInt(values.quantity)
            })
            console.log("Info sent for manufacturing request")
            console.log(response)
        }catch (error){
            console.error(error)
        }
    }

    return {handleChange, handleSubmit, values}
}

export default useManufacturingForm
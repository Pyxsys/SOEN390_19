import { useState } from "react"


const useAddInventory = () => {

    const [values, setValues] = useState({
        part: '',
        supplier: '',
        pricePerUnit: '',
        quantity: '',
        shipmentDate: '',
        arrivalDate: '',
        forModel: ''
    })

    const handleChange = e => {
        const {name, value} = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log("ADD INFO")
    }

    return {handleChange, values, handleSubmit}
}

export default useAddInventory
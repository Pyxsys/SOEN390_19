import React from 'react'
import useAddInventory from './useAddInventory'

/*
The followwing Form adds an inventory item to the database
*/
const AddInventoryForm = (props) => {
    
    const {handleChange, values, handleSubmit} = useAddInventory(
        props.submitForm
    );


    const submitForm = async (e) => {
        e.preventDefault()
        await handleSubmit()
        await props.updateRows()
    }

    return (
        <div className = "">
            <form className = "" onSubmit = {submitForm}>
                <h1>Add Inventory Information</h1>

                <div className = "">
                    <input
                    id = "internalId"
                    type = "text"
                    name = "internalId"
                    className = "form-input"
                    placeholder = "Add Bike ID"
                    value = {values.internalId}
                    onChange = {handleChange}
                    />
                </div>
                <div className = "">
                    <input
                    id = "price"
                    type = "text"
                    name = "price"
                    className = "form-input"
                    placeholder = "Add Price"
                    value = {values.price}
                    onChange = {handleChange}
                    />
                </div>
                <div className = "">
                    <input
                    id = "partInternalId"
                    type = "text"
                    name = "partInternalId"
                    className = "form-input"
                    placeholder = "Add Part ID"
                    value = {values.partInternalId}
                    onChange = {handleChange}
                    />
                </div>
                <div className = "">
                    <input
                    id = "amountRequired"
                    type = "text"
                    name = "amountRequired"
                    className = "form-input"
                    placeholder = "Add Quantity of Part"
                    value = {values.amountRequired}
                    onChange = {handleChange}
                    />
                </div>
                <div className = "">
                    <input
                    id = "provider"
                    type = "text"
                    name = "provider"
                    className = "form-input"
                    placeholder = "Add Provider"
                    value = {values.provider}
                    onChange = {handleChange}
                    />
                </div>
                <div className = "">
                    <input
                    id = "type"
                    type = "text"
                    name = "type"
                    className = "form-input"
                    placeholder = "Add Type"
                    value = {values.type}
                    onChange = {handleChange}
                    />
                </div>
                <div>
                    <button className = ""
                    type = "submit">Add Info</button>
                </div>
            </form>

        </div>
    )
}

export default AddInventoryForm
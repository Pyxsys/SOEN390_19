import React from 'react'
import useAddInventory from './useAddInventory'


const AddInventoryForm = (props) => {
    
    const {handleChange, values, handleSubmit} = useAddInventory(
        props.submitForm
    );

    return (
        <div className = "">
            <form className = "" onSubmit = {handleSubmit}>
                <h1>Add Inventory Information</h1>

                <div className = "">
                    <input
                    id = "part"
                    type = "text"
                    name = "part"
                    className = "form-input"
                    placeholder = "Add Part Info"
                    value = {values.part}
                    onChange = {handleChange}
                    />
                </div>
                <div className = "">
                    <input
                    id = "supplier"
                    type = "text"
                    name = "supplier"
                    className = "form-input"
                    placeholder = "Add Supplier Info"
                    value = {values.supplier}
                    onChange = {handleChange}
                    />
                </div>
                <div className = "">
                    <input
                    id = "pricePerUnit"
                    type = "text"
                    name = "pricePerUnit"
                    className = "form-input"
                    placeholder = "Add Price per Unit"
                    value = {values.pricePerUnit}
                    onChange = {handleChange}
                    />
                </div>
                <div className = "">
                    <input
                    id = "quantity"
                    type = "text"
                    name = "quantity"
                    className = "form-input"
                    placeholder = "Add Quantity"
                    value = {values.quantity}
                    onChange = {handleChange}
                    />
                </div>
                <div className = "">
                    <input
                    id = "shipmentDate"
                    type = "text"
                    name = "shipmentDate"
                    className = "form-input"
                    placeholder = "Add Shipment Date"
                    value = {values.shipmentDate}
                    onChange = {handleChange}
                    />
                </div>
                <div className = "">
                    <input
                    id = "arrivalDate"
                    type = "text"
                    name = "arrivalDate"
                    className = "form-input"
                    placeholder = "Add Arrival Date"
                    value = {values.arrivalDate}
                    onChange = {handleChange}
                    />
                </div>
                <div className = "">
                    <input
                    id = "forModel"
                    type = "text"
                    name = "forModel"
                    className = "form-input"
                    placeholder = "Add for which Model"
                    value = {values.forModel}
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
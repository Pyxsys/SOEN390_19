/** [AddInventoryForm.js]
* Summary.
* The following Form adds an inventory item to the database
* 
* Description. 
* The form sends Bike info that will be added into the database with user-specified attributes.
*/
import React from 'react'
import useAddInventory from './useAddInventory'
import {useState} from 'react';

/*
The following Form adds an inventory item to the database
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
        <div className = "Inventory-Home">
            <form className = "" id="" onSubmit = {submitForm}>
                <h1>Add Inventory</h1>

                <div className = "form-data-edit">
                    <input
                    id = "Input-ID"
                    type = "text"
                    name = "internalId"
                    className = "form-input"
                    placeholder = "Add Bike ID"
                    value = {values.internalId}
                    onChange = {handleChange}
                    />
                </div>
                <div className = "form-data-edit">
                    <input
                    id = "Input-ID"
                    type = "text"
                    name = "price"
                    className = "form-input"
                    placeholder = "Add Price"
                    value = {values.price}
                    onChange = {handleChange}
                    />
                </div>
                <div className = "form-data-edit">
                    <input
                    id = "Input-ID"
                    type = "text"
                    name = "provider"
                    className = "form-input"
                    placeholder = "Add Provider"
                    value = {values.provider}
                    onChange = {handleChange}
                    />
                </div>
                <div className = "form-data-edit">
                    <input
                    id = "Input-ID"
                    type = "text"
                    name = "type"
                    className = "form-input"
                    placeholder = "Add Type"
                    value = {values.type}
                    onChange = {handleChange}
                    />
                </div>
                <div className = "form-data-edit">
                    <input
                    id = "Input-ID"
                    type = "text"
                    name = "numberOfUnits"
                    className = "form-input"
                    placeholder = "Add quantity"
                    value = {values.numberOfUnits}
                    onChange = {handleChange}
                    />
                </div>

                <div className = "form-data-edit">
                    <input
                    id = "Input-ID"
                    type = "text"
                    name = "partsList"
                    className = "form-input"
                    placeholder = "Add parts list"
                    value = {values.partsList}
                    onChange = {handleChange}
                    />
                </div>
                <div>
                    <button className = ""
                    type = "submit">Add Info</button>
                </div>
            </form>
            <form className="" onSubmit={handleSubmit}>   
       
            {/* {values.partsList.map((part, index)=>(

                {
                values.partsList.map((part, index)=>(

                <div key={index}>
                </div>
            ))} */}
        </form>
        </div>
    )
}

export default AddInventoryForm

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
            <form className = "inv-form" id="" onSubmit = {submitForm}>
                <h1>Add Inventory</h1>

                <div className = "form-data-edit">
                    <input
                    id = "Input-ID"
                    type = "text"
                    name = "internalId"
                    className = "form-input"
                    placeholder = "Bike ID"
                    value = {values.internalId}
                    onChange = {handleChange}
                    />
                </div>
                &nbsp; &nbsp;&nbsp; &nbsp;
                <div className = "form-data-edit">
                    <input
                    id = "Input-ID"
                    type = "text"
                    name = "price"
                    className = "form-input"
                    placeholder = "Price"
                    value = {values.price}
                    onChange = {handleChange}
                    />
                </div>
                &nbsp; &nbsp;&nbsp; &nbsp;
                <div className = "form-data-edit">
                    <input
                    id = "Input-ID"
                    type = "text"
                    name = "provider"
                    className = "form-input"
                    placeholder = "Provider"
                    value = {values.provider}
                    onChange = {handleChange}
                    />
                </div>
                &nbsp; &nbsp;&nbsp; &nbsp;
                <div className = "form-data-edit">
                    <input
                    id = "Input-ID"
                    type = "text"
                    name = "type"
                    className = "form-input"
                    placeholder = "Type"
                    value = {values.type}
                    onChange = {handleChange}
                    />
                </div>
                &nbsp; &nbsp;&nbsp; &nbsp;
                <div className = "form-data-edit">
                    <input
                    id = "Input-ID"
                    type = "text"
                    name = "numberOfUnits"
                    className = "form-input"
                    placeholder = "Quantity"
                    value = {values.numberOfUnits}
                    onChange = {handleChange}
                    />
                </div>
                &nbsp; &nbsp;&nbsp; &nbsp;
                <div className = "form-data-edit">
                    <input
                    id = "Input-ID-Big"
                    type = "text"
                    name = "partsList"
                    className = "form-input"
                    placeholder = "Parts list"
                    value = {values.partsList}
                    onChange = {handleChange}
                    />
                </div>
                &nbsp; &nbsp;&nbsp; &nbsp;
                    <button className = "inv-input-btn"
                    type = "submit">Add Info</button>
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

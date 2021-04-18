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
               
     <button id="InstButton">Instructions</button>
      <div id="myModal" class="modal">
         <div class="modal-content">
          <div class="modal-header">
            <span class="close">&times;</span>
            <h2>Instructions</h2>
          </div>
          <div class="modal-body">
            <p>Start by ensuring that you have the type of parts needed (amount not necessary) </p>
            <p> &nbsp;</p>
            <p>If you did not start by creating/adding the parts to the data set, then go to the bike page.</p>
            <p> &nbsp;</p>
            <p> To add bike add a unique bike ID, price (number), provider (Brand/Name),  Type (eg. Mountain/Speed), Quantity (How many bikes) Then add the parts list.</p>
            <p> &nbsp;</p>
            <p> Once you have the parts list, format is like an instructions is as followed: </p>
            <p> &nbsp;</p>
            <p>  Inside the Part's Invertory fill the following: </p>
            <p> &nbsp;</p>
            <p>Part-1 ID, Part-1 Amount , Part-2 ID, Part-2 Amount, etc..., Part-N ID, Part-N Amount</p>
            <p> &nbsp;</p>
            <p> Then click "Add Bike" to submit and add the bike to the inventory and you are done.</p>  
          </div>
          <div class="modal-footer">
            <h3> </h3>
          </div>
        </div>
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

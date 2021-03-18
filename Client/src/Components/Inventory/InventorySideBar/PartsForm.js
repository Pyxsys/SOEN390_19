/** [PartsForm.js]
* Summary.
* The following Form adds an parts inventory.
* 
* Description. 
* The form adds parts by ID to th table and automatically updates the page.
*/

import React from 'react'
import usePartsForm from './usePartsForm'
const PartsForm = (props) => {
   
    const {handleChange, partValues, handleSubmit} = usePartsForm(
        props.submitForm
    );
    
    const submitForm = async (e) => {
        e.preventDefault()
        await handleSubmit()
        await props.updateRows()
    }

    return (
        <div className = "Inventory-Home">
            <h1>Add Part</h1>
           <form className = "" onSubmit={submitForm}>
            <div className = "form-data-edit">
                    <input
                    id = "Input-ID"
                    type = "text"
                    name = "internalId"
                    className = "form-input"
                    placeholder = "Add Part ID"
                    value = {partValues.internalId}
                    onChange = {handleChange}
                    />
                </div>
                <div className = "form-data-edit">
                    <input
                    id = "Input-ID"
                    type = "text"
                    name = "partType"
                    className = "form-input"
                    placeholder = "Add Type"
                    value = {partValues.type}
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
                    value = {partValues.price}
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
                    value = {partValues.provider}
                    onChange = {handleChange}
                    />
                </div>
                <div className = "form-data-edit">
                    <input
                    id = "Input-ID"
                    type = "text"
                    name = "numberOfUnits"
                    className = "form-input"
                    placeholder = "Add Number Of Units"
                    value = {partValues.numberOfUnits}
                    onChange = {handleChange}
                    />
                </div>
              <div>
                <button className="" type="submit">Add Part</button>
              </div>
                
            </form>
        </div>
    )
}

export default PartsForm
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
                    placeholder = "Part ID"
                    value = {partValues.internalId}
                    onChange = {handleChange}
                    />
                </div>
                &nbsp; &nbsp; &nbsp; &nbsp;
                <div className = "form-data-edit">
                    <input
                    id = "Input-ID"
                    type = "text"
                    name = "partType"
                    className = "form-input"
                    placeholder = "Type"
                    value = {partValues.type}
                    onChange = {handleChange}
                    />
                </div>
                &nbsp; &nbsp; &nbsp; &nbsp;
                <div className = "form-data-edit">
                    <input
                    id = "Input-ID"
                    type = "text"
                    name = "price"
                    className = "form-input"
                    placeholder = "Price"
                    value = {partValues.price}
                    onChange = {handleChange}
                    />
                </div>
                &nbsp; &nbsp; &nbsp; &nbsp;
                <div className = "form-data-edit">
                    <input
                    id = "Input-ID"
                    type = "text"
                    name = "provider"
                    className = "form-input"
                    placeholder = "Provider"
                    value = {partValues.provider}
                    onChange = {handleChange}
                    />
                </div>
                &nbsp; &nbsp; &nbsp; &nbsp;
                <div className = "form-data-edit">
                    <input
                    id = "Input-ID"
                    type = "text"
                    name = "numberOfUnits"
                    className = "form-input"
                    placeholder = "Number Of Units"
                    value = {partValues.numberOfUnits}
                    onChange = {handleChange}
                    />
                </div>
                &nbsp; &nbsp; &nbsp; &nbsp;            
                <button className="inv-input-btn" type="submit">Add Part</button>                
            </form>
        </div>
        
    )
}

export default PartsForm


import React from 'react'
import useAccountingForm from './useAccountingForm'
const AccountingForm = (props) => {
   
    const {handleChange, values, handleSubmit} = useAccountingForm(
        props.submitForm
    );
    
    const submitForm = async (e) => {
        e.preventDefault()
        await handleSubmit()
        await props.updateRows()
    }

    return (
        <div className = "Inventory-Home">
            <h1>Add Order</h1>
           <form className = "" onSubmit={submitForm}>
           <div className = "form-data-edit">
                    <input
                    id = "Input-ID"
                    type = "text"
                    name = "internalId"
                    className = "form-input"
                    placeholder = "Order ID"
                    value = {values.internalId}
                    onChange = {handleChange}
                    />
                </div>
                &nbsp; &nbsp; &nbsp; &nbsp;
            <div className = "form-data-edit">
                    <input
                    id = "Input-ID"
                    type = "text"
                    name = "client"
                    className = "form-input"
                    placeholder = "Client"
                    value = {values.client}
                    onChange = {handleChange}
                    />
                </div>
                &nbsp; &nbsp; &nbsp; &nbsp;
                <div className = "form-data-edit">
                    <input
                    id = "Input-ID"
                    type = "text"
                    name = "item"
                    className = "form-input"
                    placeholder = "Bike Id"
                    value = {values.item}
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
                    placeholder = "Quantity"
                    value = {values.numberOfUnits}
                    onChange = {handleChange}
                    />
                </div>
                &nbsp; &nbsp; &nbsp; &nbsp;            
                <button className="inv-input-btn" type="submit">Submit</button>                
            </form>
        </div>
        
    )
}

export default AccountingForm
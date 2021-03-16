import React from 'react'
import useAddInventory from './useAddInventory'
import {useState} from 'react';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import RemoveIcon from '@material-ui/icons/Remove'
import AddIcon from '@material-ui/icons/Add'
import Icon from '@material-ui/core/Icon'
import handleAddFields from './useAddInventory'
import handleChangeInput from './useAddInventory'
import handleRemoveFields from './useAddInventory'
import { makeStyles } from '@material-ui/core/styles'

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

                <div className = "">
                    <input
                    id = "partsList"
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
                <div key={index}>
                </div>
            ))} */}
        </form>
   

        </div>
    )
}

export default AddInventoryForm
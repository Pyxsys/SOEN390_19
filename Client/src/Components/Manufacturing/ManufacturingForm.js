import React, { useState, useEffect } from 'react'
import useManufacturingForm from './useManufacturingForm'
import {fetchRows} from '../../APIService'
import "../../CSSFiles/Manufacturing.css"

/** [ManufacturingForm.js]
* Summary.
* The following Form requests to make a bike based off of information in the back end
* 
* Description. 
* The form takes the ID of a bike and the quantity for each one then submits a request
*/
const ManufacturingForm = (props) => {
  var status
  const [rows, setRows] = useState([])
  const [response, setResponse] = useState("No request made")
  
  useEffect(async () => {
    await fetchDropDown()
  }, [])

  const fetchDropDown = async () => {
   var temp = await fetchRows();
   console.log("TEMP ", temp)
    setRows(temp)
  }
  var optionItems = rows.map((item) =>
  <option value = {item.internalId}> {item.internalId} </option>
)

const {handleChange, handleSubmit, values} = useManufacturingForm(
  props.submitForm
)

const submitForm = async (e) => {
  e.preventDefault()
  status = await handleSubmit()
  setResponse(status.data.message)
  console.log(status)
}

  return (
    <div id= "manufacture-formed">
            <h1>  Manufacture a bike </h1>
      <form className="" id= "" onSubmit={submitForm}>
            <label>
          Which Bike Model:
          <select 
          id = "Input-ID"
          type="text"
          name = "internalId"
          value= {values.internalId}
          onChange = {handleChange}>
            <option value = "select"> Select </option>
            {optionItems}
          </select>
          <br/>
        </label>
          <input
             id = "Input-ID-Manufacture"
            type="text"
            name="quantity"
            placeholder= "Quantity"
            value = {values.quantity}
            onChange = {handleChange}
            />
        <div>
        <button className = ""  
        type = "submit">REQUEST
        </button>
        </div>
      </form>
          <h1>{response}</h1>
        </div>


   )










}

export default ManufacturingForm
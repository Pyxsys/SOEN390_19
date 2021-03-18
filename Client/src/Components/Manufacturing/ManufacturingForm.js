import React, { useState, useEffect } from 'react'
import useManufacturingForm from './useManufacturingForm'
import {fetchRows} from '../../APIService'

const ManufacturingForm = () => {
  const [rows, setRows] = useState([])
  
  useEffect(async () => {
    await fetchDropDown()
  }, [])

  const fetchDropDown = async () => {
   var temp = await fetchRows();
   console.log("TEMP ", temp)
    setRows(temp)
  }

  var optionItems = rows.map((item) =>
  <option key = {item.internalId} >{item.internalId}</option>
)

    return (
        <div>
            <h1>  Manufacture a bike </h1>
            <form>
            <label>
          Which Bike Model:
          <select >
            {optionItems}
          </select>
          <br/>
        </label>
            <label>
          Amount Requested:
          <input
            name="Amount Requested"
            type="number"
            />
        </label>
        <div>
        <button className = ""  t
        type = "submit">REQUEST</button>
                </div>


            </form>
        </div>


    )










}

export default ManufacturingForm
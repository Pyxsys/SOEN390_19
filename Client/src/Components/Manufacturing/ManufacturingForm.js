import React from 'react'
import useManufacturingForm from './useManufacturingForm'



const ManufacturingForm = () => {

  

    return (
        <div>
            <h1>  Manufacture a bike </h1>
            <form>
            <label>
          Which Bike Model:
          <select >
            <option value="BXSP01">BXSP01</option>
            <option value="BXSP01">BXSP01</option>
            <option value="BXSP01">BXSP01</option>
            <option value="BXSP01">BXSP01</option>
            
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
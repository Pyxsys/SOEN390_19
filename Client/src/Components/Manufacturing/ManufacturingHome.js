import React, {useState, useEffect} from 'react';
import Manufacturing from './Manufacturing'
import ManufacturingForm from './ManufacturingForm'
import {fetchRows} from '../../APIService'
import InventorySideBar from '../Inventory/InventorySideBar/InventorySideBar'

/** [ManufaturingHome.js]
* Summary.
* Shows the Manufcaturing From
* 
* Description. 
* Renders the manufacturing form component
*/
function ManufacturingHome() {

    return (
        <div>
            <InventorySideBar/>
            <ManufacturingForm/>
        
        </div>
    )
}

export default ManufacturingHome
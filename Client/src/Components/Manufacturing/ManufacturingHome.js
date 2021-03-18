import React, {useState, useEffect} from 'react';
import Manufacturing from './Manufacturing'
import ManufacturingForm from './ManufacturingForm'
import {fetchRows} from '../../APIService'

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
            <ManufacturingForm/>
        
        </div>
    )
}

export default ManufacturingHome
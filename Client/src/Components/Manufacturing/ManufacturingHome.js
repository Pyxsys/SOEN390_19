import React, {useState, useEffect} from 'react';
import Manufacturing from './Manufacturing'
import ManufacturingForm from './ManufacturingForm'
import {fetchRows} from '../../APIService'

function ManufacturingHome() {

    return (
        <div>
            <ManufacturingForm/>
            <h1></h1>
        
        </div>
    )
}

export default ManufacturingHome
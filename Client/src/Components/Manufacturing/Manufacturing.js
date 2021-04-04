import React from 'react'
import ManufacturingHome from "./ManufacturingHome"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Navbar from "../Navbar/Navbar"
import InventoryHome from '../Inventory/InventorySideBar/InventoryHome'
import Parts from '../Inventory/InventorySideBar/Parts'
import InventorySideBar from '../Inventory/InventorySideBar/InventorySideBar'
/** [Manufacturing.js]
* Summary.
* Renders the Manufacturing Path with routes including the manufacturing ghome
* 
* Description. 
* Rendering and routes with navbar
*/

function Manufacturing() {
    return (
        <div>
            <Router>
            <InventorySideBar/>
            <Switch>
                <Route path= "/Manufacturing" exact component = {ManufacturingHome}/>
                <Route path= "/Inventory" exact component = {InventoryHome}/>
                <Route path= "/Inventory/PartsNeeded" component = {Parts}/>
            </Switch>
            
        </Router>
        </div>
    )
}

export default Manufacturing

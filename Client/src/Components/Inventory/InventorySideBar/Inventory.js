/** [Inventory.js]
* Summary.
The inventory function is using the slidebar and its routes
* 
* Description. 
Thanks to slidebar and its routes we can receive the information for Inventory and parts needed for the inventory.

*/

import React from 'react'
import InventorySideBar from './InventorySideBar';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import InventoryHome from "./InventoryHome"
import Parts from "./Parts"
import Navbar from "../../Navbar/Navbar"



function Inventory() {
    return (
        <div>
            <Router>
            {/* <Navbar/> */}
            <InventorySideBar/>
            <Switch>
                <Route path= "/Inventory" exact component = {InventoryHome}/>
                <Route path= "/Inventory/PartsNeeded" component = {Parts}/>
            </Switch>
        </Router>
        </div>
    )
}

export default Inventory

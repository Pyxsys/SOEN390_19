import React from 'react'
import InventorySideBar from './InventorySideBar';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import InventoryHome from "./InventoryHome"
import Parts from "./Parts"
import Navbar from "../../Navbar/Navbar"

/*
 Inventory function utilizing the sidebar and its routes
*/

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

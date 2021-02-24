import React from 'react'
import InventorySideBar from './InventorySideBar';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import InventoryHome from "./InventoryHome"
import PartsNeeded from "./PartsNeeded"
import Navbar from "../../Navbar/Navbar"

function Inventory() {
    return (
        <div>
            <Router>
            {/* <Navbar/> */}
            <InventorySideBar/>
            <Switch>
                <Route path= "/Inventory" exact component = {InventoryHome}/>
                <Route path= "/Inventory/PartsNeeded" component = {PartsNeeded}/>
            </Switch>
        </Router>
        </div>
    )
}

export default Inventory

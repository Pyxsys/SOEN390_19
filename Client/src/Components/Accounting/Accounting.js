import React from 'react'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import InventoryHome from '../Inventory/InventorySideBar/InventoryHome'
import AccountingHome from '../Accounting/AccountingHome'
import Parts from '../Inventory/InventorySideBar/Parts'
import InventorySideBar from '../Inventory/InventorySideBar/InventorySideBar'

function Accounting() {
    return (
        <div>
            <Router>
            <InventorySideBar/>
            <Switch>
                <Route path= "/Accounting" exact component = {AccountingHome}/>
                <Route path= "/Inventory" exact component = {InventoryHome}/>
                <Route path= "/Inventory/PartsNeeded" component = {Parts}/>
            </Switch>
            
        </Router>
        </div>
    )
}

export default Accounting

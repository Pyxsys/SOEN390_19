import React from 'react'


import ManufacturingHome from "./ManufacturingHome"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Navbar from "../Navbar/Navbar"

function Manufacturing() {
    return (
        <div>
            <Router>
            <Switch>
                <Route path= "/Manufacturing" exact component = {ManufacturingHome}/>
         
            </Switch>
            
        </Router>
        </div>
    )
}

export default Manufacturing

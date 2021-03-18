import React from 'react'
import ManufacturingHome from "./ManufacturingHome"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Navbar from "../Navbar/Navbar"

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
            <Switch>
                <Route path= "/Manufacturing" exact component = {ManufacturingHome}/>
         
            </Switch>
            
        </Router>
        </div>
    )
}

export default Manufacturing

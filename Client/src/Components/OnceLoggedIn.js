/** [OnceLoggedIn.js]
* Summary. 
When the user is authenticated, we are able to display the logged in page.
Displaying the navbar and using Routes to switch between components.
* 
* Description. 
If user can enter inside the page  we will be showing the components after login, 
such as navbar,inventory,sales , manufacturing.
*/

import React from 'react'
import Navbar from "./Navbar/Navbar"
import {AuthContext}from "../Contexts/AuthorizationContext"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Inventory from "../Components/Inventory/InventorySideBar/Inventory"
import Manufacturing from './Manufacturing/Manufacturing'
import Accounting from './Accounting/Accounting'

 
const OnceLoggedIn = () => {

    const {loggedIn, setLoggedIn} = React.useContext(AuthContext)
  
    return (
      <div>
          <Navbar/>
          <Switch>
          <Route path= "/Inventory" component = {Inventory}/>
          <Route path = "/Manufacturing" component = {Manufacturing}/>
          <Route path = "/Accounting" component = {Accounting}/>
          </Switch>
      </div>
    );
  }
  
  export default OnceLoggedIn;
  
import React from 'react'
import Navbar from "./Navbar/Navbar"
import {AuthContext}from "../Contexts/AuthorizationContext"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Inventory from "../Components/Inventory/InventorySideBar/Inventory"
import Manufacturing from './Manufacturing/Manufacturing'


/**
 * When the user is authenticated, we are able to display the logged in page.
 * Displaying the navbar and using Routes to switch between components.
*/
 
const OnceLoggedIn = () => {

    const {loggedIn, setLoggedIn} = React.useContext(AuthContext)
  
    return (
      <div>
          <Navbar/>
          <Switch>
          <Route path= "/Inventory" component = {Inventory}/>
          <Route path = "/Manufacturing" component = {Manufacturing}/>
          </Switch>
      </div>
    );
  }
  
  export default OnceLoggedIn;
  
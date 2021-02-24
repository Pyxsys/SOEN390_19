import React from 'react'
import Navbar from "./Navbar/Navbar"
import {AuthContext}from "../Contexts/AuthorizationContext"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Inventory from "../Components/Inventory/InventorySideBar/Inventory"


const OnceLoggedIn = () => {

    const {loggedIn, setLoggedIn} = React.useContext(AuthContext)
  
    return (
      <div>
          <Navbar/>
          <Switch>
          <Route path= "/Inventory" component = {Inventory}/>
          <Route path = "/Sales"/>
          </Switch>
      </div>
    );
  }
  
  export default OnceLoggedIn;
  
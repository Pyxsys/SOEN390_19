import Navbar from './Navbar/Navbar';
import SignUpAndSuccessPage from './SignUpAndSuccessPage';
import {AuthProvider, AuthContext} from '../Contexts/AuthorizationContext'
import React, { useState } from 'react';
import Inventory from '../Components/Inventory/InventorySideBar/Inventory'
import OnceLoggedIn from './OnceLoggedIn'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"


function Routes() {

  const {loggedIn, setLoggedIn} = React.useContext(AuthContext)

  console.log(loggedIn)
  return (
    <div>
        {!loggedIn ? (<SignUpAndSuccessPage/>):
        <Router>
          <OnceLoggedIn/>
        </Router>
        }
    </div>
  );
}

export default Routes;

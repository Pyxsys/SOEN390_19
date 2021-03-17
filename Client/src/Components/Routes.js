/** [Routes.js]
* Summary. 
This Routes code is to show the sign up page if the user is not logged in
or the OnceLogggedIn page when the user has been authorized.
*
* Description. 
We will be showing the user the aftermath of sign up or after loggin in.
*/


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

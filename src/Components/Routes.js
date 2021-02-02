import Navbar from './Navbar/Navbar';
import SignUpAndSuccessPage from './SignUpAndSuccessPage';
import {AuthProvider, AuthContext} from '../Contexts/AuthorizationContext'
import React, { useState } from 'react';

function Routes() {

  const {loggedIn, setLoggedIn} = React.useContext(AuthContext)

  console.log(loggedIn)
  return (
    <div>
        {!loggedIn ? (<SignUpAndSuccessPage/>):
        <Navbar/>}
    </div>
  );
}

export default Routes;

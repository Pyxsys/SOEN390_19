/** [App.js]
* Summary.
AuthProvider wraps the Routes so that we can check when loggedIn is true.
* 
* Description. 
Thanks to AuthProvider we will be checking the wrapped Router in order to verify if user is logged in or not.
*/

import './CSSFiles/App.css';
import {AuthProvider, AuthContext} from './Contexts/AuthorizationContext'
import React, { useState } from 'react';
import Routes from './Components/Routes'


function App() {

  return (
    <div className="App">
      <AuthProvider>
       <Routes/>
      </AuthProvider>
    </div>
  );
}

export default App;

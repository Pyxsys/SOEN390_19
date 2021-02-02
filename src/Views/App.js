import './CSSFiles/App.css';
import {AuthProvider, AuthContext} from './Contexts/AuthorizationContext'
import React, { useState } from 'react';
import Routes from './Components/Routes'


function App() {

  // const {loggedIn, setLoggedIn} = React.useContext(AuthContext)

  return (
    <div className="App">
      <AuthProvider >
       <Routes/>
        
      </AuthProvider>
    </div>
  );
}

export default App;

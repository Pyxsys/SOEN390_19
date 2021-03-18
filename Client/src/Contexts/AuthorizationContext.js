/** [AuthorizationContext.js]
* Summary. 
This context is able to pass whether the user is logged in or not to all of the chidren components.
* 
* Description. 
It will show us if the login is successfull or failure and pass to its children components
*/


import React, { useContext ,useState } from 'react';




export const AuthContext = React.createContext();
export const AuthProvider = ({ children }) => {
    
    const [loggedIn, setLoggedIn] = useState(false);
    console.log(loggedIn)

  return (
    <AuthContext.Provider value={{loggedIn, setLoggedIn}}>
      {children}
    </AuthContext.Provider>
  );
};
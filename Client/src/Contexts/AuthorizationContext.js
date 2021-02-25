import React, { useContext ,useState } from 'react';


/**
 * This context is able to pass whether the user is logged in or not to all of the chidren components.
 */

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
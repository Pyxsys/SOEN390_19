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
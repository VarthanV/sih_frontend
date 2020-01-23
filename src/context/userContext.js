import React, { createContext, useState } from "react";
export const UserContext = createContext();

const UserContextProvider = props => {
  const [user, setUser] = useState({
    isLoggedIn: false,
    token: null,
  });

  const addUser = (token) => {
    console.log(token);
    
    setUser({token, isLoggedIn: true});
    localStorage.setItem('token',token);
  };

  const removeUser = () => {
    setUser({
      isLoggedIn: false,
      token: null,
    });
  };

  return (
    <UserContext.Provider value={{ user, addUser,removeUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
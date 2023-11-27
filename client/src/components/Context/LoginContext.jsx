import { createContext, useContext, useState } from 'react';

const LoginContext = createContext();

export const useLogin = () => useContext(LoginContext);

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [auth, setAuth] = useState({ token: localStorage.getItem("token")});

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    userId,
    setUserId,
    userName,
    setUserName,
    auth,
    setAuth
  };

  return <LoginContext.Provider value={value}>{children}</LoginContext.Provider>;
};
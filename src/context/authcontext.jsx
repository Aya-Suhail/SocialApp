/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useState,
} from "react";


export const authContext = createContext(null);

export function AuthContextProvider({ children }){

  // lazy initalization
  const [token, setToken] = useState(()=>{
    return localStorage.getItem('token') 
  })


  return (
    <authContext.Provider value={{ token, setToken }}>
      {children}
    </authContext.Provider>
  );
}

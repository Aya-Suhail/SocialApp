import axios from "axios";
import { createContext, useContext } from "react";
import { baseUrl } from "../const/env";
import { authContext } from "./authcontext";
import { useQuery } from "@tanstack/react-query";

// eslint-disable-next-line react-refresh/only-export-components
export const userContext = createContext(null)

export function UserContextProvider({children}){

  // const [userData,setUser] = useState(null)
  const {token} = useContext(authContext)

  function getUserData(){
   return  axios.get(`${baseUrl}/users/profile-data`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })}



 let {data:userData}=  useQuery({
  queryFn:getUserData,
  queryKey:['userData'],
  enabled:!!token,
  select:(data)=>data?.data.data.user


  })


  return <userContext.Provider value={{userData}}>
    {children}
  </userContext.Provider>

};


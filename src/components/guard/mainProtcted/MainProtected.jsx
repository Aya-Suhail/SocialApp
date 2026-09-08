import { Navigate } from "react-router-dom";


const MainProtected = ({children}) => {
    if(localStorage.getItem('token') !== null){
      return children
    }else{
      return <Navigate to={'/'}/>
    }
}

export default MainProtected;

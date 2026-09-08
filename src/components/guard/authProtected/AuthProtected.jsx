import { Navigate } from "react-router-dom";


const AuthProtected = (children) => {
    if(localStorage.getItem('token')==null){
      return children
    }else{
      return <Navigate to={'/home'} />
    }
}

export default AuthProtected;

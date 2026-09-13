import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../../../context/authContext";
import { userContext } from "../../../context/userContext";
import { useQueryClient } from "@tanstack/react-query";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // let { user } = useContext(userContext);
  // const { setToken } = useContext(authContext);

  // let auth = useContext(authContext);

  // if (!auth) {
  //   throw new Error("there is error");
  // }

  // let { setToken } = auth;

let {userData}=useContext(userContext);
let {setToken} = useContext(authContext) ;



  

  let navigate = useNavigate();
  const query = useQueryClient()
  function LogOutSystem() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/");
    query.removeQueries({queryKey:['userData']})
  }

  return (
    <nav className="bg-white shadow-xl  w-full z-20  border-b border-default">
      <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4">
        
        <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-3xl text-heading text-sky-800 font-bold whitespace-nowrap">Social App</span>
        </a>
        

        <div className="flex flex-wrap ">
      
        
        <div className={`items-center justify-between ${isMobileMenuOpen ? 'block' : 'hidden'} w-full md:flex md:w-auto md:order-1`} id="navbar-user">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
           
            <li>
              <Link  to={'/home'} className="block py-2 px-3 mx-7 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0">Home</Link>
            </li>
             
          </ul>
        </div>

         <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          
          <div className="relative flex items-center">
            <button 
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} 
              type="button" 
              className="flex text-sm bg-neutral-primary rounded-full md:me-0 focus:ring-4 focus:ring-neutral-tertiary" 
              id="user-menu-button" 
              aria-expanded={isUserMenuOpen}
            >
              <span className="sr-only">Open user menu</span>
              <img className="w-8 h-8 rounded-full" src={userData?.photo} alt="user photo" />
            </button>
            
            {/* التعديل هنا: ضفنا absolute top-full right-0 mt-2 */}
            <div className={`absolute top-full right-0 mt-2 z-50 ${isUserMenuOpen ? 'block' : 'hidden'} bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg w-44`} id="user-dropdown">
              <div className="px-4 py-3 text-sm border-b border-default">
                <span className="block text-heading font-medium">{userData?.name}</span>
                <span className="block text-body truncate">{userData?.email}</span>
              </div>
              <ul className="p-2 text-sm text-body font-medium" aria-labelledby="user-menu-button">
                <li>
                  <Link to={'/profile'} className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">profile</Link>
                </li>
               
                <li>
                  <a onClick={()=>{LogOutSystem()}} className=" cursor-pointer inline-flex items-center w-full p-2 text-red-900 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Sign out</a>
                </li>
              </ul>
            </div>
          </div>

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            type="button" 
            className="inline-flex items-center p-2 w-10 h-10 ms-3 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary" 
            aria-controls="navbar-user" 
            aria-expanded={isMobileMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeWidth={2} d="M5 7h14M5 12h14M5 17h14" /></svg>
          </button>       
        </div>
        </div>
       
        
      </div>
    </nav>
  );
};

export default Navbar;

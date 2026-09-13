import { RouterProvider } from 'react-router-dom'
import './App.css'
import {routes} from './Routes/route'
import { ToastContainer } from 'react-toastify';

function App() {
  

  return (
    <>
      <RouterProvider router={routes}/>
      <ToastContainer />
    </>
  )
}

export default App

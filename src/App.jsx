import LeftBar from "./components/leftBar/LeftBar";
import NavBar from "./components/navBar/NavBar";
import RightBar from "./components/rightBar/RightBar";
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import Home from "./pages/Home/Home"
import Profile from "./pages/Profile/Profile";
import './app.scss'

import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";


function App() {
  
  const currentUser= true;
  const Layout =()=> {
    return (
      <div>
       <NavBar />
       <div style={{display:'flex'}}>
        <LeftBar/>
        <div style={{flex:6}}>
        <Outlet/>
        </div>
        <RightBar/>
       </div>
      </div>
    )
  }

  const ProtectedLayout = ({children})=>{
        if(!currentUser){
          return <Navigate to="/login"/>
                        }
                      
          return children
    }


  const router = createBrowserRouter([
    {
      path: "/",
      element: (
      <ProtectedLayout>
        <Layout/>
      </ProtectedLayout>),
      children: [
        { 
        path: "/Home", 
        element: <Home /> 
      },
      { 
        path: "/Profile/:id", 
        element: <Profile/> 
      },
      ]
    },{
      path: "/Login",
      element: <Login/>
    },
    {
      path: "/Register",
      element: <Register />
    },
  ]);

 

  return (
    <>
       <RouterProvider router={router} />
    </>
  )
}

export default App

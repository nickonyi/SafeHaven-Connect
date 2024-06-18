import LeftBar from "./components/leftBar/LeftBar";
import NavBar from "./components/navBar/NavBar";
import RightBar from "./components/rightBar/RightBar";
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import Home from "./pages/Home/Home"
import Profile from "./pages/Profile/Profile";
import Messenger from "./pages/messenger/messenger";
import './app.scss'
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';

import { useContext } from "react";
import { DarkModeContext } from "./context/DarkModeContext";
import { AuthContext } from "./context/AuthContext";

function App() {

  const {darkMode} = useContext(DarkModeContext);
  const {currentUser}= useContext(AuthContext);

 

  

  const queryClient = new QueryClient();

 
  const Layout =()=> {
    return (
      <QueryClientProvider client ={queryClient}  contextSharing={true}>
      <div className={`theme-${darkMode?"dark":"light"}`}>
       <NavBar />
       <div style={{display:'flex'}}>
        <LeftBar/>
        <div style={{flex:6}}>
        <Outlet/>
        </div>
        <RightBar/>
       </div>
      </div>
      </QueryClientProvider>
    )
  }

  const ChatLayout =()=> {
    return (
      <QueryClientProvider client ={queryClient}>
      <div className={`theme-${darkMode?"dark":"light"}`}>
        <NavBar />
        <div style={{flex:6}}>
          <Outlet />
        </div>
        </div>
        </QueryClientProvider>

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
        path: "/", 
        element: <Home /> 
      },
      { 
        path: "/Profile/:id", 
        element: <Profile/> 
      }
      ]
    },
    {
      path:'/messenger',
      element: (
      <ProtectedLayout>
        <ChatLayout/>
      </ProtectedLayout>),
      children:[
        {
          path: '/messenger',
          element: <Messenger/>
        }
      ]
    },
    {
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

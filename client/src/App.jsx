import LeftBar from "./components/leftBar/LeftBar";
import NavBar from "./components/navBar/NavBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import RightBar from "./components/rightBar/RightBar";
import EventNavBar from "./components/eventNavBar/EventNavBar";
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import Home from "./pages/Home/Home"
import Profile from "./pages/Profile/Profile";
import Messenger from "./pages/messenger/Messenger";
import LandingPage from "./routes/landingPage/LandingPage";
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
import { EventProvider} from "./context/EventContext";
import EventsPage from "./pages/eventsPage/EventsPage";
import PostEvent from "./pages/postEvent/PostEvent";
import CreateTicket from "./pages/createTicket/CreateTicket";
import ManageEvent from "./pages/manageEvent/ManageEvent";
import ManageRegistration from "./pages/manageRegistration/ManageRegistration";
import TransactionsPage from "./pages/transactionsPage/TransactionsPage";
import JoinEvent from "./pages/joinEvent/JoinEvent";


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

  const EventLayout = ()=> {
    return (
      <QueryClientProvider client ={queryClient}>
      <div className={`theme-${darkMode?"dark":"light"}`}>
        <EventNavBar />
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
    {
      path: "/Events",
      element: (
        <ProtectedLayout>
           <EventProvider>
             <EventLayout />
           </EventProvider>
        </ProtectedLayout>
      
      ),
      children:[
        {
        path: '/Events',
        element: <LandingPage />,
      },
      {
        path: '/Events/horizontal/event',
        element:<EventsPage /> 
      },
      {
        path: '/Events/vertical/postEvent',
        element:<PostEvent /> 
      },
      {
        path: '/Events/vertical/createTicket',
        element:<CreateTicket /> 
      },
      {
        path: '/Events/vertical/manageEvent',
        element: <ManageEvent />
      },
      {
        path: '/Events/vertical/manageregistration',
        element: <ManageRegistration />
      }, 
      {
        path: '/Events/vertical/transaction',
        element: <TransactionsPage />
      },
      {
        path: '/Events/vertical/joinevent',
        element: <JoinEvent />
      }
      ]
    },
  ]);

 

  return (
    <>
       <RouterProvider router={router} />
    </>
  )
}

export default App

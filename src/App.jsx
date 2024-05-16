import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


function App() {
  const router = createBrowserRouter([
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

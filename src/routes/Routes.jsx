import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import Home from "../pages/Home";
import AddUser from "../pages/User/AddUser";

const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>,
      children: [
        {
        path: "/",
        element: <Home/>
      },
      {
        path: "/add-user",
        element: <AddUser/>
      }
    ]
    },
  ]);

export default router
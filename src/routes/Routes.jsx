import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import Home from "../pages/Home";
import AddUser from "../pages/User/AddUser";
import AllUser from "../pages/User/AllUser";
import InviteUser from "../pages/User/InviteUser";

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
      },
      {
        path: "/users",
        element: <AllUser/>
      },
      {
        path: "/invite",
        element: <InviteUser/>
      },
    ]
    },
  ]);

export default router
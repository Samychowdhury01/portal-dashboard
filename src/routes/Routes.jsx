import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import Home from "../pages/Home";
import AddUser from "../pages/User/AddUser";
import AllUser from "../pages/User/AllUser";
import InviteUser from "../pages/User/InviteUser";
import AddDepartment from "../pages/Department/AddDepartment";
import Departments from "../pages/Department/Departments";

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
      {
        path: "/add-department",
        element: <AddDepartment/>
      },
      {
        path: "/departments",
        element: <Departments/>
      },
    ]
    },
  ]);

export default router
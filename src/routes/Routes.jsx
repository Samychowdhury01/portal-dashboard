import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import Home from "../pages/Home";
import AddUser from "../pages/User/AddUser";
import AllUser from "../pages/User/AllUser";
import InviteUser from "../pages/User/InviteUser";
import AddDepartment from "../pages/Department/AddDepartment";
import Departments from "../pages/Department/Departments";
import Employees from "../pages/Employees/Employees";
import CreateEmployee from "../pages/Employees/CreateEmployee";
import PrivateRoute from "./PrivateRoute";
import Login from "../pages/Login/Login";


const router = createBrowserRouter([
    {
      path: "/",
      element:<PrivateRoute> <MainLayout/></PrivateRoute>,
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
      {
        path: "/add-employee",
        element: <CreateEmployee/>
      },
      {
        path: "/employees",
        element: <Employees/>
      },
    ]
    },
    {
      path: "/login",
      element: <Login/>
    }
  ]);

export default router
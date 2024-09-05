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
import UpdateDepartment from "../pages/Department/UpdateDepartment";
import Message from "../pages/Message/Message";
import DropItem from "../pages/DropItem/DropItem";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        {" "}
        <MainLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/add-user",
        element: <AddUser />,
      },
      {
        path: "/users",
        element: <AllUser />,
      },
      {
        path: "/invite",
        element: <InviteUser />,
      },
      {
        path: "/add-department",
        element: <AddDepartment />,
      },
      {
        path: "/update-department/:id",
        element: <UpdateDepartment />,
        loader: async ({ params }) => {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/departments/${params.id}`
          );
          if (!response.ok) {
            throw new Error(`Failed to fetch department: ${response.status}`);
          }
          return response.json(); // Assuming the response is JSON data
        },
      },
      {
        path: "/departments",
        element: <Departments />,
      },
      {
        path: "/add-employee",
        element: <CreateEmployee />,
      },
      {
        path: "/employees",
        element: <Employees />,
      },
      {
        path: "/drag",
        element: <DropItem />,
      },
      {
        path: "/message",
        element: <Message />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;

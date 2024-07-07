/* eslint-disable react/prop-types */

import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import axiosInstance from "../../../utils/axiosInstance";
import { Link } from "react-router-dom";

const EmployeeRow = ({ data, index , setEmployees}) => {

    // handle delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
              const response = await axiosInstance.delete(`/employees/${id}`);
              if (response.data?.success) {
                Swal.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success",
                });
                // Update state to remove the deleted department
                setEmployees((prevEmployees) =>
                  prevEmployees.filter((employee) => employee.id !== id)
                );
              }
            } catch (error) {
              console.error("Error deleting department:", error);
            }
          }
    });
  };
  return (
    <>
      <tr>
        <th>{index + 1}</th>
        <td>{data.full_name}</td>
        <td>{data.last_name}</td>
        <td>{data.email}</td>
        <td>{data.job_title}</td>
        <td>{data.department_name}</td>
        <td className="flex flex-row items-center justify-center gap-5">
          <Link to={`/`} className="icon-btn">
            <FaRegEdit />
          </Link>
          <button onClick={() => handleDelete(data.id)} className="icon-btn">
            <FaRegTrashAlt />
          </button>
        </td>
        
      </tr>
    </>
  );
};

export default EmployeeRow;

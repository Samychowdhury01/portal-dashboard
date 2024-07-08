/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import axiosInstance from "../../../utils/axiosInstance";
import { useState } from "react";

const EmployeeRow = ({ data, index, setEmployees, departments }) => {
  const [documentId, setDocumentId] = useState(null);
  const [updateData, setUpdateData] = useState({});

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
  // Handle update (modified to handle editing specific department)
  const handleUpdateEmployee = async (id, updatedData) => {
    try {
      const { full_name, ...restData } = updateData;
      const response = await axiosInstance.put(`/employees/${id}`, restData);
      if (response.data?.success) {
        Swal.fire({
          title: "Updated!",
          text: "Employee details have been updated successfully.",
          icon: "success",
        });

        // Update state with edited data
        setEmployees((prevEmployees) =>
          prevEmployees.map((employee) =>
            employee.id === id ? restData : employee
          )
        );

        // Reset editing state
        setDocumentId(null);
        setUpdateData({});
      }
    } catch (error) {
      console.error("Error updating Employee:", error);
      // Handle update errors (e.g., display an error message)
    }
  };

  // handle updateClick
  const handleEditClick = (payload) => {
    setDocumentId(payload.id);
    setUpdateData(payload);
  };

  // Handle cancel edit (closes edit form and resets state)
  const handleCancelEdit = () => {
    setDocumentId(null);
    setUpdateData({});
  };

  return (
    <>
      <tr>
        <th>{index + 1}</th>
        {documentId === data.id ? (
          <>
            <td>
              <input
                type="text"
                defaultValue={data.first_name} // Pre-fill with existing name
                onChange={(e) =>
                  setUpdateData({
                    ...updateData,
                    first_name: e.target.value,
                  })
                }
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue={data.last_name} // Pre-fill with existing name
                onChange={(e) =>
                  setUpdateData({
                    ...updateData,
                    last_name: e.target.value,
                  })
                }
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue={data.email} // Pre-fill with existing name
                onChange={(e) =>
                  setUpdateData({
                    ...updateData,
                    email: e.target.value,
                  })
                }
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue={data.job_title} // Pre-fill with existing name
                onChange={(e) =>
                  setUpdateData({
                    ...updateData,
                    job_title: e.target.value,
                  })
                }
              />
            </td>

            <td>
              <div className="mb-4">
                <select className="select  select-bordered border-gray-300 focus:outline-none w-full">
                  <option value={data.department_id}>
                    {data.department_name}
                  </option>
                  {departments &&
                    departments.map((department) => (
                      <option
                        onChange={(e) => e.target.value}
                        key={department.id}
                        value={department.id}
                      >
                        {`${department.id}(${department.name})`}
                      </option>
                    ))}
                </select>
              </div>
            </td>
            <td className="flex items-center justify-center">
              <button
                onClick={() => handleUpdateEmployee(data.id, updateData)}
                className="btn btn-sm btn-primary"
              >
                Update
              </button>
              <button
                onClick={handleCancelEdit}
                className="btn btn-sm btn-secondary ml-2"
              >
                Cancel
              </button>
            </td>
          </>
        ) : (
          <>
            <td>{data.full_name}</td>
            <td>{data.last_name}</td>
            <td>{data.email}</td>
            <td>{data.job_title}</td>
            <td>{data.department_name}</td>
            <td className="flex flex-row items-center justify-center gap-5">
              <button
                onClick={() => handleEditClick(data)}
                className="icon-btn"
              >
                <FaRegEdit />
              </button>
              <button
                onClick={() => handleDelete(data.id)}
                className="icon-btn"
              >
                <FaRegTrashAlt />
              </button>
            </td>
          </>
        )}
      </tr>
    </>
  );
};

export default EmployeeRow;

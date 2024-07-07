import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import useFetchData from "../../../hooks/useFetchData";
import Swal from "sweetalert2";
import Loader from "../shared/Loader";
import axiosInstance from "../../../utils/axiosInstance";
import { useState } from "react";
import AddDepartmentForm from "./AddDepartmentForm";
import ActionBtn from "../ActionBtn";
import handleDelete from "../../../utils/handleDelete";
const DepartmentData = ({ handleCheck, checkedName }) => {
  const {
    isLoading,
    data: departments,
    setData,
  } = useFetchData("/departments");

  const [addDepartmentShow, setAddDepartmentShow] = useState(false);

  // State to manage editing a specific department
  const [editingDepartmentId, setEditingDepartmentId] = useState(null);
  const [editedDepartmentData, setEditedDepartmentData] = useState({});

  // Handle update (modified to handle editing specific department)
  const handleUpdateDepartment = async (id, updatedData) => {
    try {
      const response = await axiosInstance.put(
        `/departments/${id}`,
        updatedData
      );
      if (response.data?.success) {
        Swal.fire({
          title: "Updated!",
          text: "Department details have been updated successfully.",
          icon: "success",
        });

        // Update state with edited data
        setData((prevDepartments) =>
          prevDepartments.map((department) =>
            department.id === id ? updatedData : department
          )
        );

        // Reset editing state
        setEditingDepartmentId(null);
        setEditedDepartmentData({});
      }
    } catch (error) {
      console.error("Error updating department:", error);
      // Handle update errors (e.g., display an error message)
    }
  };

  // Handle edit button click (opens edit form for the specific department)
  const handleEditClick = (department) => {
    setEditingDepartmentId(department.id);
    setEditedDepartmentData({ ...department }); // Copy department data for editing
  };

  // Handle cancel edit (closes edit form and resets state)
  const handleCancelEdit = () => {
    setEditingDepartmentId(null);
    setEditedDepartmentData({});
  };

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="overflow-x-auto h-full">
          <table className="table relative z-0">
            {/* Head */}
            <thead className="bg-slate-100">
              <tr>
                <th></th>
                <th>Department ID</th>
                <th>Department Name</th>
                <th>
                  <ActionBtn>
                    <button onClick={() => setAddDepartmentShow(true)}>
                      Add Department
                    </button>
                  </ActionBtn>
                </th>
              </tr>
            </thead>
            <tbody>
              {addDepartmentShow && (
                <tr>
                  <th></th>
                  <td colSpan={4}>
                    <AddDepartmentForm
                      setShow={setAddDepartmentShow}
                      setData={setData}
                    />
                  </td>
                </tr>
              )}
              {departments &&
                departments.map((department, index) => (
                  <tr key={index}>
                    <th>
                      <input
                        type="checkbox"
                        checked={checkedName === department.name}
                        onChange={() => handleCheck(department.name)}
                        className="checkbox checkbox-primary"
                      />
                    </th>
                    <td>{department.id}</td>
                    {editingDepartmentId === department.id ? (
                      <>
                        <td>
                          <input
                            type="text"
                            defaultValue={department.name} // Pre-fill with existing name
                            onChange={(e) =>
                              setEditedDepartmentData({
                                ...editedDepartmentData,
                                name: e.target.value,
                              })
                            }
                          />
                        </td>
                        <td>
                          <button
                            onClick={() =>
                              handleUpdateDepartment(
                                department.id,
                                editedDepartmentData
                              )
                            }
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
                        <td>{department.name}</td>
                        <td className="flex gap-2">
                          <button
                            onClick={() => handleEditClick(department)}
                            className="icon-btn"
                          >
                            <FaRegEdit />
                          </button>
                          <button
                            className="icon-btn"
                            onClick={() =>
                              handleDelete(
                                department.id,
                                "departments",
                                setData
                              )
                            }
                          >
                            <FaRegTrashAlt />
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default DepartmentData;

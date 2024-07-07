import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import useFetchData from "../../../hooks/useFetchData";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../shared/Loader";
import axiosInstance from "../../../utils/axiosInstance";
import ActionBtn from "../ActionBtn";

const DepartmentData = ({ handleCheck, checkedName }) => {
  const {
    isLoading,
    data: departments,
    setData,
  } = useFetchData("/departments");

  // handle delete
  const handleDelete = async (id) => {
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
          const response = await axiosInstance.delete(`/departments/${id}`);
          if (response.data?.success) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            // Update state to remove the deleted department
            setData((prevDepartments) =>
              prevDepartments.filter((department) => department.id !== id)
            );
          }
        } catch (error) {
          console.error("Error deleting department:", error);
        }
      }
    });
  };

  console.log(checkedName, "from line 47 department data");

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <Loader />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table relative z-0">
            {/* head */}
            <thead className="bg-slate-100">
              <tr>
                <th></th>
                <th>Department ID</th>
                <th>Department Name</th>
                <th>
                  <ActionBtn>
                    <button>Add Department</button>
                  </ActionBtn>
                </th>
              </tr>
            </thead>
            <tbody>
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
                    <td>{department.name}</td>
                    <td className="space-x-4">
                      <Link to={`/`} className="icon-btn">
                        <FaRegEdit />
                      </Link>
                      <button className="icon-btn">
                        <FaRegTrashAlt />
                      </button>
                    </td>
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

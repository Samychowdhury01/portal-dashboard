import Loader from "../../components/ui/shared/Loader";
import DepartmentRow from "../../components/ui/Departments/DepartmentRow";
import { useContext } from "react";
import { DataContext } from "../../provider/DataProvider";

const Departments = () => {
  const { isDepartmentsLoading, departments, setDepartments } =
    useContext(DataContext);
  return (
    <>
      {isDepartmentsLoading ? (
        <div className="flex items-center justify-center h-screen">
          :
          <Loader />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table relative z-0">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Department ID</th>
                <th>Department Name</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {departments &&
                departments.map((department, index) => (
                  <DepartmentRow
                    data={department}
                    key={index}
                    index={index}
                    setDepartments={setDepartments}
                  />
                ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Departments;

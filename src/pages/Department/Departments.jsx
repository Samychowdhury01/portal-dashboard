import Loader from "../../components/ui/shared/Loader";
import DepartmentRow from "../../components/ui/Departments/DepartmentRow";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

const Departments = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get("/departments");
        setDepartments(response.data?.data);
        console.log(response.data?.data);
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error);
        setDepartments([]);
        setIsLoading(false); // Optional: Handle error state if needed
      }
    };

    fetchData();
  }, []);
  console.log(departments);
  return (
    <>
      {isLoading ? (
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
                  <DepartmentRow data={department} key={index} index={index} setDepartments={setDepartments}/>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Departments;

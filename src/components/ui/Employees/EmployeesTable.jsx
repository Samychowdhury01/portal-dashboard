/* eslint-disable react/prop-types */
import EmployeeRow from "./EmployeeRow";
import { useState, useEffect } from "react";
import EmployeeForm from "./EmployeeForm";
import useFetchData from "../../../hooks/useFetchData";
import axiosInstance from "../../../utils/axiosInstance";
import { showErrorMessage } from "../../../utils/showMessages";
import ActionBtn from "../ActionBtn";

const EmployeesTable = ({ setData, employees }) => {
  console.log(employees, 'employees data from employees');
  const [addEmployeeToggle, setAddEmployeeToggle] = useState(false);
  const { data: departments } = useFetchData("/departments");

  const fetchEmployees = async () => {
    try {
      const response = await axiosInstance.get("/employees");
      setData(response.data.data);
    } catch (error) {
      showErrorMessage("Failed to fetch employees");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="table relative z-0">
        <thead className="bg-slate-100">
          <tr>
            <th></th>
            <th>Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Job Title</th>
            <th>Department</th>
            <th className="text-center">
              <ActionBtn>
                <button onClick={() => setAddEmployeeToggle(true)}>
                  Add Employee
                </button>
              </ActionBtn>
            </th>
          </tr>
        </thead>
        <tbody>
          {addEmployeeToggle && (
            <tr>
              <td colSpan={7}>
                <EmployeeForm
                  setAddEmployeeToggle={setAddEmployeeToggle}
                  fetchEmployees={fetchEmployees}
                  departments={departments}
                />
              </td>
            </tr>
          )}
          {Array.isArray(employees) &&
            employees.map((employee, index) => (
              <EmployeeRow
                data={employee}
                key={index}
                index={index}
                setEmployees={setData} 
                departments={departments}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeesTable;

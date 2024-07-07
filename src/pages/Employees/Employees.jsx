import { useState } from "react";
import DepartmentData from "../../components/ui/Employees/DepartmentData";
import EmployeesTable from "../../components/ui/Employees/EmployeesTable";
import Loader from "../../components/ui/shared/Loader";
import useFetchData from "../../hooks/useFetchData";

const Employees = () => {
  const { isLoading, data: employees, setData } = useFetchData("/employees");
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [checkedName, setCheckedName] = useState(null);

console.log(employees);
  const handleCheck = (name) => {
    if (checkedName === name) {
      setCheckedName(null);
      setFilteredEmployees(employees);
      return;
    }

    setCheckedName(name);
    const filteredData = employees.filter(
      (employee) => employee.department_name === name
    );
    setFilteredEmployees(filteredData);
  };

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <Loader />
        </div>
      ) : (
        <div>
          <div>
            <h3 className="text-center text-2xl font-semibold my-4">
              Departments
            </h3>
            <DepartmentData
              handleCheck={handleCheck}
              checkedName={checkedName}
            />
          </div>
          <div className="h-[2px] bg-black my-10 w-full"></div>
          <div>
            <h3 className="text-center text-2xl font-semibold my-4">
              Employees
            </h3>
            <EmployeesTable
              employees={checkedName ? filteredEmployees : employees}
              setData={setData}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Employees;

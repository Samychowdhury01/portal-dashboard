import { createContext } from "react";
import useFetchData from "../hooks/useFetchData";

export const DataContext = createContext(null);
const DataProvider = ({ children }) => {
  const {
    isDepartmentsLoading,
    data: departments,
    setDepartments,
  } = useFetchData("/departments");

  console.log(departments);
  const data = {
    departments,
    setDepartments,
    isDepartmentsLoading,
  };
  return (
    !isDepartmentsLoading && (
      <DataContext.Provider value={data}>{children}</DataContext.Provider>
    )
  );
};

export default DataProvider;

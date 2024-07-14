import { createContext } from "react";
import useFetchData from "../hooks/useFetchData";

export const DataContext = createContext(null);
const DataProvider = ({ children }) => {
  const {
    isLoading: isDepartmentsLoading,
    data: departments,
    setData: setDepartments,
  } = useFetchData("/departments");

  const {
    isLoading: isDropItemsLoading,
    data: dropItems,
    setData: setDropItems,
  } = useFetchData("/items");

  const data = {
    departments,
    setDepartments,
    isDepartmentsLoading,
    dropItems,
    setDropItems,
    isDropItemsLoading,
  };
  return (
    !isDepartmentsLoading && (
      <DataContext.Provider value={data}>{children}</DataContext.Provider>
    )
  );
};

export default DataProvider;

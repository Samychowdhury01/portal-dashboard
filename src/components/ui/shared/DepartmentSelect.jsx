import { useContext } from "react";
import { DataContext } from "../../../provider/DataProvider";

const DepartmentSelect = ({
  isItemInput,
  register,
  isDragging,
  handleChange,
  defaultValue,
}) => {
  const { departments, isDepartmentLoading } = useContext(DataContext);

  // to get te department
  const filteredDepartment = departments.find(
    (department) => department.id === defaultValue
  );

  
  return (
    <div>
      <label className={`label-text ${isDragging && "text-white"}`}>
        Department
      </label>
      {isItemInput ? (
        <select
          onChange={handleChange}
          name="department_id"
          className="select select-bordered border-gray-300 focus:outline-none"
          required
        >
          <option value={defaultValue}>{filteredDepartment?.name}</option>
          {!isDepartmentLoading &&
            departments?.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
        </select>
      ) : (
        <select
          {...register("department_id")}
          className="select select-bordered border-gray-300 focus:outline-none"
        >
          <option value={defaultValue || ""}>{defaultValue || ""}</option>
          {!isDepartmentLoading &&
            departments?.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
        </select>
      )}
    </div>
  );
};

export default DepartmentSelect;

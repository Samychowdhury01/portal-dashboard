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

  return (
    <div>
      <label className={`label-text ${isDragging && "text-white"}`}>
        Department
      </label>
      {isItemInput ? (
        <select
          onChange={handleChange}
          className="select select-bordered border-gray-300 focus:outline-none"
          required
        >
          <option value={defaultValue}>{defaultValue}</option>
          {!isDepartmentLoading &&
            departments?.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
        </select>
      ) : (
        <select
          {...register("departmentId")}
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

import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import handleDelete from "../../../utils/handleDelete";

const DepartmentRow = ({ data, index, setDepartments }) => {
  return (
    <tr>
      <th>{index + 1}</th>
      <td>{data.id}</td>
      <td>{data.name}</td>
      <td>
        <Link to={`/update-department/${data.id}`} className="icon-btn">
          <FaRegEdit />
        </Link>
      </td>
      <td>
        <button
          onClick={() => handleDelete(data.id, "departments", setDepartments)}
          className="icon-btn"
        >
          <FaRegTrashAlt />
        </button>
      </td>
    </tr>
  );
};

export default DepartmentRow;

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import WidgetFormInput from "./WidgetFormInput";
import DepartmentSelect from "../ui/shared/DepartmentSelect";
import handleDelete from "../../utils/handleDelete";
import {
  FaExpandAlt,
  FaRegTrashAlt,
  FaRegWindowMinimize,
} from "react-icons/fa";

const Item = ({ item, handleInputChange, setUpdatedItems, setAddNewForm }) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: "transform ease-in-out, width 0.5s ease-in-out",
    touchAction: "none",
    zIndex: isDragging ? 100 : 0,
    opacity: isDragging ? 0.8 : 1,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    handleInputChange(item.id, name, value);
  };

  const handleExpand = (id) => {
    setUpdatedItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, expanded: !item.expanded } : item
      )
    );
  };

  const handleDeleteClick = () => {
    const itemId = String(item.id); // Ensure item.id is a string
    if (itemId.startsWith("new-")) {
      setAddNewForm(false);
      setUpdatedItems((prevItems) =>
        prevItems.filter((prevItem) => prevItem.id !== item.id)
      );
    } else {
      handleDelete(item.id, "items", setUpdatedItems);
      console.log(item.id);
    }
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`p-3 border-2 border-primary rounded-lg shadow-lg mb-2 bg-primary ${
        isDragging
          ? "bg-opacity-100 shadow-2xl shadow-primary"
          : "bg-opacity-20"
      } ${item?.expanded ? "w-full" : "w-[400px]"}`}
      {...attributes}
    >
      <div {...listeners} className="cursor-grab">
        <span>::</span>
      </div>
      <div className="flex items-center justify-end gap-5">
        <button
          onClick={() => handleExpand(item?.id)}
          className="btn  border-primary text-gray-700 hover:btn-primary hover:-opacity-10"
        >
          {item.expanded ? <FaRegWindowMinimize /> : <FaExpandAlt />}
        </button>
        <button
          onClick={handleDeleteClick}
          className="btn border-primary text-gray-700 hover:btn-primary hover:-opacity-10"
        >
          <FaRegTrashAlt />
        </button>
      </div>

      <form>
        <div
          className={`${!item.expanded && "flex items-center justify-center"}`}
        >
          <WidgetFormInput
            name="username"
            defaultValue={item.username}
            handleChange={handleChange}
            placeholder="username"
            isDragging={isDragging}
            isItemInput={true}
            label="Username"
          />
        </div>

        <div
          className={`flex items-center gap-4 my-5 ${
            item?.expanded ? "block" : "hidden"
          }`}
        >
          <WidgetFormInput
            defaultValue={item.job_title}
            handleChange={handleChange}
            name="job_title"
            placeholder="job Title"
            isDragging={isDragging}
            isItemInput={true}
            label="Job Title"
          />

          <WidgetFormInput
            defaultValue={item.email}
            handleChange={handleChange}
            name="email"
            placeholder="email"
            isDragging={isDragging}
            isItemInput={true}
            label="Email"
          />

          <div>
            <DepartmentSelect
              isItemInput={true}
              isDragging={isDragging}
              handleChange={handleChange}
              defaultValue={item.department_id}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Item;

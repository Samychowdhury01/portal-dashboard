/* eslint-disable no-unused-vars */
import { useSortable } from "@dnd-kit/sortable";
import { useEffect } from "react";
import { CSS } from "@dnd-kit/utilities";
import WidgetFormInput from "./WidgetFormInput";
import DepartmentSelect from "../ui/shared/DepartmentSelect";

const Item = ({ item, setFormData, formData }) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.id,
    data: {
      type: "item",
      item,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: "transform ease-in-out", // Adjust as needed
    touchAction: "none",
    zIndex: isDragging ? 100 : 0,
    opacity: isDragging ? 0.8 : 1,
  };
  // to delete the input box
  // const handleDelete = () => {
  //   reset();
  //   setOpenForm(false);
  // };

  // const handleExpand = (e) => {
  //   e.preventDefault();
  //   setExpand(!expand);
  // };

  useEffect(() => {
    setFormData({
      ...formData,
      id: item.id,
      username: item.username || "",
      jobTitle: item.jobTitle || "",
      email: item.email || "",
      department: item.department || "HR",
    });
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`p-3 border-2 border-primary transition-all ease-in-out duration-300 rounded-lg shadow-lg mb-2 bg-primary  cursor-grab ${
        isDragging
          ? "bg-opacity-100 shadow-2xl shadow-primary"
          : "bg-opacity-20"
      }`} //${expand ? "w-full" : "w-[800px]"}
    >
      {/* button div */}
      {/* <div className="flex items-center justify-end gap-5">
        <button onClick={handleExpand} className="btn btn-primary">
          Expand
        </button>
        <button onClick={handleDelete} className="btn btn-secondary">
          Delete
        </button>
      </div> */}
      
      {/* form */}
      <form>
        <div>
          <WidgetFormInput
            name="username"
            defaultValue={item.username}
            onChange={handleChange}
            placeholder="username"
            isDragging={isDragging}
            isItemInput={true}
            label="Username"
          />
        </div>

        <div className="flex items-center gap-4 my-5">
          <WidgetFormInput
            defaultValue={item.jobTitle}
            onChange={handleChange}
            name="jobTitle"
            placeholder="jobTitle"
            isDragging={isDragging}
            isItemInput={true}
            label="Job Title"
          />

          <WidgetFormInput
            defaultValue={item.email}
            onChange={handleChange}
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
              onChange={handleChange}
              defaultValue={item.department}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Item;

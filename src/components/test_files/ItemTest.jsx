import { useSortable } from "@dnd-kit/sortable";
import { useEffect } from "react";
import { CSS } from "@dnd-kit/utilities";

const Item = ({ item, setFormData, formData }) => {
  const { setNodeRef, attributes, listeners, transform, transition, isDragging } =
    useSortable({
      id: item.id,
      data: {
        type: "item",
        item,
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: "none",
    zIndex: isDragging ? 50 : 0,
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
      className={`p-3 border-2 border-primary transition-all ease-in-out duration-300 rounded-lg shadow-lg mb-2`} //${expand ? "w-full" : "w-[800px]"}
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
          <label className="text-gray-700 text-base font-medium m-2">
            Username
          </label>
          <input
            className="input input-bordered"
            type="text"
            id="username"
            name="username"
            defaultValue={item.username}
            onChange={handleChange}
            placeholder="username"
          />
        </div>

        <div className="flex items-center gap-4 my-5">
          <div>
            <label className="block text-gray-700 text-base font-medium mb-2">
              Job Title
            </label>
            <input
              className="input input-bordered"
              type="text"
              defaultValue={item.jobTitle}
              onChange={handleChange}
              name="jobTitle"
              placeholder="jobTitle"
              id="jobTitle"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-base font-medium mb-2">
              Email
            </label>
            <input
              className="input input-bordered"
              type="email"
              defaultValue={item.email}
              onChange={handleChange}
              name="email"
              placeholder="email"
              id="email"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-base font-medium mb-2">
              Department
            </label>
            <select
              onChange={handleChange}
              className="input input-bordered"
              name="department"
              defaultValue={item.department || "HR"}
            >
              <option value="HR">HR</option>
              {/* Add other department options here if needed */}
            </select>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Item;


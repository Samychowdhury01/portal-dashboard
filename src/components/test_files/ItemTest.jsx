// {
//   /* button div */
// }
// //       {/* <div className="flex items-center justify-end gap-5">
// //         <button onClick={handleExpand} className="btn btn-primary">
// //           Expand
// //         </button>
// //         <button onClick={handleDelete} className="btn btn-secondary">
// //           Delete
// //         </button>
// //       </div> */}

// import { useSortable } from "@dnd-kit/sortable";
// import { useEffect, useState } from "react";
// import { CSS } from "@dnd-kit/utilities";
// import WidgetFormInput from "./WidgetFormInput";
// import DepartmentSelect from "../ui/shared/DepartmentSelect";

// const Item = ({ item, setFormData, formData }) => {
//   const [expand, setExpand] = useState(false);
//   const [expandedId, setExpandedId] = useState(null);
//   const {
//     setNodeRef,
//     attributes,
//     listeners,
//     transform,
//     transition,
//     isDragging,
//   } = useSortable({
//     id: item.id,
//     data: {
//       type: "item",
//       item,
//     },
//   });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition: "transform ease-in-out", // Adjust as needed
//     touchAction: "none",
//     zIndex: isDragging ? 100 : 0,
//     opacity: isDragging ? 0.8 : 1,
//   };

//   useEffect(() => {
//     setFormData({
//       ...formData,
//       id: item.id,
//       username: item.username || "",
//       job_title: item.job_title || "",
//       email: item.email || "",
//       department_id: item.department_id || "",
//       expanded: expand,
//     });
//   }, [item]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   return (
//     <div
//       ref={setNodeRef}
//       style={style}
//       className={`p-3 border-2 border-primary transition-all ease-in-out duration-300 rounded-lg shadow-lg mb-2 bg-primary  ${
//         isDragging
//           ? "bg-opacity-100 shadow-2xl shadow-primary"
//           : "bg-opacity-20"
//       }`} //${expand ? "w-full" : "w-[800px]"}
//       {...attributes}
//     >
//       {/* Drag handle div */}
//       <div {...listeners} className="cursor-grab">
//         {/* You can use an icon or a specific part as a drag handle */}
//         <span>::</span>
//       </div>

//       {/* form */}
//       <form>
//         <WidgetFormInput
//           name="username"
//           defaultValue={item.username}
//           handleChange={handleChange}
//           placeholder="username"
//           isDragging={isDragging}
//           isItemInput={true}
//           label="Username"
//         />

//         <div className="flex items-center gap-4 my-5">
//           <WidgetFormInput
//             defaultValue={item.job_title}
//             handleChange={handleChange}
//             name="jobTitle"
//             placeholder="jobTitle"
//             isDragging={isDragging}
//             isItemInput={true}
//             label="Job Title"
//           />

//           <WidgetFormInput
//             defaultValue={item.email}
//             handleChange={handleChange}
//             name="email"
//             placeholder="email"
//             isDragging={isDragging}
//             isItemInput={true}
//             label="Email"
//           />

//           <div>
//             <DepartmentSelect
//               isItemInput={true}
//               isDragging={isDragging}
//               handleChange={handleChange}
//               defaultValue={item.department_id}
//             />
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Item;

{
  /* button div */
}
//       {/* <div className="flex items-center justify-end gap-5">
//         <button onClick={handleExpand} className="btn btn-primary">
//           Expand
//         </button>
//         <button onClick={handleDelete} className="btn btn-secondary">
//           Delete
//         </button>
//       </div> */}

import { useSortable } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import WidgetFormInput from "./WidgetFormInput";
import DepartmentSelect from "../ui/shared/DepartmentSelect";

const Item = ({ item, handleInputChange, setUpdatedItems }) => {
  const [expand, setExpand] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    handleInputChange(item.id, name, value, expand);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`p-3 border-2 border-primary transition-all ease-in-out duration-300 rounded-lg shadow-lg mb-2 bg-primary  ${
        isDragging
          ? "bg-opacity-100 shadow-2xl shadow-primary"
          : "bg-opacity-20"
      }`} //${expand ? "w-full" : "w-[800px]"}
      {...attributes}
    >
      {/* Drag handle div */}
      <div {...listeners} className="cursor-grab">
        {/* You can use an icon or a specific part as a drag handle */}
        <span>::</span>
      </div>

      {/* form */}
      <form>
        <WidgetFormInput
          name="username"
          defaultValue={item.username}
          handleChange={handleChange}
          placeholder="username"
          isDragging={isDragging}
          isItemInput={true}
          label="Username"
        />

        <div className="flex items-center gap-4 my-5">
          <WidgetFormInput
            defaultValue={item.job_title}
            handleChange={handleChange}
            name="jobTitle"
            placeholder="jobTitle"
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

// import { useSortable } from "@dnd-kit/sortable";
// import { useState } from "react";
// import { CSS } from "@dnd-kit/utilities";
// import WidgetFormInput from "./WidgetFormInput";
// import DepartmentSelect from "../ui/shared/DepartmentSelect";
// import handleDelete from "../../utils/handleDelete";

// const Item = ({ item, handleInputChange, setUpdatedItems, updatedItems }) => {
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

//   // styling for drag and drop
//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition: "transform ease-in-out", // Adjust as needed
//     touchAction: "none",
//     zIndex: isDragging ? 100 : 0,
//     opacity: isDragging ? 0.8 : 1,
//   };

//   // handler for track the changes of input
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     handleInputChange(item.id, name, value);
//   };

//   // handle expand
//   const handleExpand = (id) => {
//     const isExpanded = updatedItems.find((item) => item.id === id);

//     if (isExpanded.expanded) {
//       setUpdatedItems((prevItems) =>
//         prevItems.map((item) =>
//           item.id === id ? { ...item, expanded: false } : item
//         )
//       );
//     } else {
//       setExpandedId(id);
//       setExpand(true);
//       setUpdatedItems((prevItems) =>
//         prevItems.map((item) =>
//           item.id === id ? { ...item, expanded: true } : item
//         )
//       );
//     }
//   };
//   return (
//     <div
//       ref={setNodeRef}
//       style={style}
//       className={`p-3 border-2 border-primary transition-all ease-in-out duration-300 rounded-lg shadow-lg mb-2 bg-primary  ${
//         isDragging
//           ? "bg-opacity-100 shadow-2xl shadow-primary"
//           : "bg-opacity-20"
//       } ${item?.expanded ? "w-full" : "w-[400px]"}`}
//       {...attributes}
//     >
//       {/* Drag handle div */}
//       <div {...listeners} className="cursor-grab">
//         {/* You can use an icon or a specific part as a drag handle */}
//         <span>::</span>
//       </div>
//       <div className="flex items-center justify-end gap-5">
//         <button
//           onClick={() => handleExpand(item?.id)}
//           className="btn btn-primary"
//         >
//           Expand
//         </button>
//         <button
//           onClick={() => handleDelete(item.id, "items", setUpdatedItems)}
//           className="btn btn-secondary"
//         >
//           Delete
//         </button>
//       </div>

//       {/* form */}
//       <form>
//         <div
//           className={`${!item.expanded && "flex items-center justify-center"}`}
//         >
//           <WidgetFormInput
//             name="username"
//             defaultValue={item.username}
//             handleChange={handleChange}
//             placeholder="username"
//             isDragging={isDragging}
//             isItemInput={true}
//             label="Username"
//           />
//         </div>

//         <div
//           className={`flex items-center gap-4 my-5 ${
//             item?.expanded ? "block" : "hidden"
//           }`}
//         >
//           <WidgetFormInput
//             defaultValue={item.job_title}
//             handleChange={handleChange}
//             name="job_title"
//             placeholder="job Title"
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

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import WidgetFormInput from "./WidgetFormInput";
import DepartmentSelect from "../ui/shared/DepartmentSelect";
import handleDelete from "../../utils/handleDelete";

const Item = ({ item, handleInputChange, setUpdatedItems }) => {
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

  // styling for drag and drop
  const style = {
    transform: CSS.Transform.toString(transform),
    transition: "transform ease-in-out, width 0.5s ease-in-out", // Ensure width is also transitioned
    touchAction: "none",
    zIndex: isDragging ? 100 : 0,
    opacity: isDragging ? 0.8 : 1,
  };

  // handler for track the changes of input
  const handleChange = (e) => {
    const { name, value } = e.target;
    handleInputChange(item.id, name, value);
  };

  // handle expand
  const handleExpand = (id) => {
    setUpdatedItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, expanded: !item.expanded } : item
      )
    );
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
      {/* Drag handle div */}
      <div {...listeners} className="cursor-grab">
        {/* You can use an icon or a specific part as a drag handle */}
        <span>::</span>
      </div>
      <div className="flex items-center justify-end gap-5">
        <button
          onClick={() => handleExpand(item?.id)}
          className="btn btn-primary"
        >
          Expand
        </button>
        <button
          onClick={() => handleDelete(item.id, "items", setUpdatedItems)}
          className="btn btn-secondary"
        >
          Delete
        </button>
      </div>

      {/* form */}
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



// import { useSortable } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";
// import WidgetFormInput from "./WidgetFormInput";
// import DepartmentSelect from "../ui/shared/DepartmentSelect";
// import handleDelete from "../../utils/handleDelete";

// const Item = ({ item, handleInputChange, setUpdatedItems }) => {
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

//   // styling for drag and drop
//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition: "transform ease-in-out, width 0.5s ease-in-out", // Ensure width is also transitioned
//     touchAction: "none",
//     zIndex: isDragging ? 100 : 0,
//     opacity: isDragging ? 0.8 : 1,
//   };

//   // handler for track the changes of input
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     handleInputChange(item.id, name, value);
//   };

//   // handle expand
//   const handleExpand = (id) => {
//     setUpdatedItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === id ? { ...item, expanded: !item.expanded } : item
//       )
//     );
//   };

//   return (
//     <div
//       ref={setNodeRef}
//       style={style}
//       className={`p-3 border-2 border-primary rounded-lg shadow-lg mb-2 bg-primary ${
//         isDragging
//           ? "bg-opacity-100 shadow-2xl shadow-primary"
//           : "bg-opacity-20"
//       } ${item?.expanded ? "w-full" : "w-[400px]"}`}
//       {...attributes}
//     >
//       {/* Drag handle div */}
//       <div {...listeners} className="cursor-grab">
//         {/* You can use an icon or a specific part as a drag handle */}
//         <span>::</span>
//       </div>
//       <div className="flex items-center justify-end gap-5">
//         <button
//           onClick={() => handleExpand(item?.id)}
//           className="btn btn-primary"
//         >
//           Expand
//         </button>
//         <button
//           onClick={() => handleDelete(item.id, "items", setUpdatedItems)}
//           className="btn btn-secondary"
//         >
//           Delete
//         </button>
//       </div>

//       {/* form */}
//       <form>
//         <div
//           className={`${!item.expanded && "flex items-center justify-center"}`}
//         >
//           <WidgetFormInput
//             name="username"
//             defaultValue={item.username}
//             handleChange={handleChange}
//             placeholder="username"
//             isDragging={isDragging}
//             isItemInput={true}
//             label="Username"
//           />
//         </div>

//         <div
//           className={`flex items-center gap-4 my-5 ${
//             item?.expanded ? "block" : "hidden"
//           }`}
//         >
//           <WidgetFormInput
//             defaultValue={item.job_title}
//             handleChange={handleChange}
//             name="job_title"
//             placeholder="job Title"
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

// --------------------
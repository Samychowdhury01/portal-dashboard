// import { useMemo, useState } from "react";
// import Item from "./Item";
// import WidgetForm from "./WidgetForm";
// import { useForm } from "react-hook-form";
// import { DndContext, DragOverlay } from "@dnd-kit/core";
// import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

// const WidgetItems = ({ items, setItems }) => {
//   const [openForm, setOpenForm] = useState(false);
//   const [formData, setFormData] = useState({
//     id: "",
//     username: "",
//     jobTitle: "",
//     email: "",
//     departments: "HR",
//   });

//   const itemId = useMemo(() => items.map((item) => item.id), [items]);
//   const { activeItem, setActiveItem } = useState(null);

//   const [expand, setExpand] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = async (data) => {
//     if (Object.keys(data) === 0) {
//       setItems([...items, data]);
//       console.log("from if block");
//       return;
//     }

//     const itemIndex = items.findIndex((item) => item.id === formData.id);
//     if (itemIndex !== -1) {
//       // Update existing item
//       const updatedItems = [...items];
//       updatedItems[itemIndex] = formData;
//       setItems(updatedItems);
//       console.log("from nested if block", items);

//       return;
//     } else {
//       // Add new item
//       setItems([...items, formData]);
//       console.log("from else block");
//       return;
//     }
//   };

//   return (
//     <div>
//       <DndContext>
//         <div>
//           <button
//             onClick={() => setOpenForm(true)}
//             className="btn btn-primary my-5 mr-5"
//           >
//             Add
//           </button>
//           <button onClick={handleSubmit(onSubmit)} className="btn btn-primary">
//             save
//           </button>
//         </div>
//         <div>
//           {openForm && (
//             <WidgetForm
//               setOpenForm={setOpenForm}
//               register={register}
//               expand={expand}
//               setExpand={setExpand}
//               errors={errors}
//               reset={reset}
//             />
//           )}
//         </div>

//         {/* map the items */}
//         <div>
//           <SortableContext items={itemId} strategy={verticalListSortingStrategy}>
//             {items.map((item) => (
//               <Item
//                 key={item.id}
//                 item={item}
//                 setFormData={setFormData}
//                 formData={formData}
//               />
//             ))}
//           </SortableContext>
//         </div>
//       </DndContext>
//     </div>
//   );
// };

// export default WidgetItems;


import { useMemo, useState } from "react";
import Item from "./Item";
import WidgetForm from "./WidgetForm";
import { useForm } from "react-hook-form";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";

const WidgetItems = ({ items, setItems }) => {
  const [openForm, setOpenForm] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    username: "",
    jobTitle: "",
    email: "",
    department: "HR",
  });

  const itemId = useMemo(() => items.map((item) => item.id), [items]);
  const [activeItem, setActiveItem] = useState(null);

  const [expand, setExpand] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (!data.id) {
      setItems([...items, { ...data, id: Date.now().toString() }]);
      return;
    }

    const itemIndex = items.findIndex((item) => item.id === data.id);
    if (itemIndex !== -1) {
      // Update existing item
      const updatedItems = [...items];
      updatedItems[itemIndex] = data;
      setItems(updatedItems);
    } else {
      // Add new item
      setItems([...items, data]);
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      setItems(arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <div>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div>
          <button
            onClick={() => setOpenForm(true)}
            className="btn btn-primary my-5 mr-5"
          >
            Add
          </button>
          <button onClick={handleSubmit(onSubmit)} className="btn btn-primary">
            save
          </button>
        </div>
        <div>
          {openForm && (
            <WidgetForm
              setOpenForm={setOpenForm}
              register={register}
              expand={expand}
              setExpand={setExpand}
              errors={errors}
              reset={reset}
              setFormData={setFormData}
              formData={formData}
            />
          )}
        </div>

        <div>
          <SortableContext items={itemId} strategy={verticalListSortingStrategy}>
            {items.map((item) => (
              <Item
                key={item.id}
                item={item}
                setFormData={setFormData}
                formData={formData}
              />
            ))}
          </SortableContext>
        </div>
      </DndContext>
    </div>
  );
};

export default WidgetItems;

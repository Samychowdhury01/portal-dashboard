import { useMemo, useState } from "react";
import Item from "./Item";
import WidgetForm from "./WidgetForm";
import { useForm } from "react-hook-form";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import axiosInstance from "../../utils/axiosInstance";
import { showErrorMessage, showSuccessMessage } from "../../utils/showMessages";

const WidgetItems = ({ items, isItemsLoading }) => {
  const [openForm, setOpenForm] = useState(false);
  const [updatedItems, setUpdatedItems] = useState(!isItemsLoading && items);
  const itemId = useMemo(() => updatedItems.map((item) => item.id), [items]);
  const [formExpand, setFormExpand] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // to track which item is changing
  const handleInputChange = (id, field, value, expand) => {
    setUpdatedItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, [field]: value, expanded: expand } : item
      )
    );
  };

  // onSubmit handler for save button
  const onSubmit = async (data) => {
    // check if submitted from form
    if (Object.keys(data).length !== 0) {
      // Calculate item_order
      const itemOrder = updatedItems.length + 1;
      const item = { ...data, item_order: itemOrder, expanded: formExpand };
      try {
        const response = await axiosInstance.post("/items", item);
        console.log("line 51", response.data);
        if (response.data.success) {
          showSuccessMessage("new drop item added");
          reset();
          setOpenForm(false);
        }
      } catch (error) {
        console.log(error);
        showErrorMessage(error.response.data.message);
        reset();
      }
    }
    console.log('out side of the objectkeys if block');

    // update existing data
    try {
      const response = await axiosInstance.put("/items", updatedItems);
      if (response.data.success) {
        console.log('try block after if', response.data.data);
        showSuccessMessage("Items updated successfully");
        reset();
        setOpenForm(false);
      }
    } catch (error) {
      console.log(error);
      showErrorMessage(error.response.data.message);
      reset();
    }

    // Send new order to the backend
    try {
      await axiosInstance.put("/items/order", updatedItems);
    } catch (error) {
      console.error("Failed to update order:", error);
    }
    console.log({data, updatedItems});
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = updatedItems.findIndex((item) => item.id === active.id);
      const newIndex = updatedItems.findIndex((item) => item.id === over.id);
      const newOrder = arrayMove(updatedItems, oldIndex, newIndex);
      setUpdatedItems(newOrder);
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
              formExpand={formExpand}
              setFormExpand={setFormExpand}
              errors={errors}
              reset={reset}
            />
          )}
        </div>

        <div>
          <SortableContext
            items={itemId}
            strategy={verticalListSortingStrategy}
          >
            {updatedItems.map((item) => (
              <Item
                key={item.id}
                item={item}
                handleInputChange={handleInputChange}
                setUpdatedItems={setUpdatedItems}
              />
            ))}
          </SortableContext>
        </div>
      </DndContext>
    </div>
  );
};

export default WidgetItems;

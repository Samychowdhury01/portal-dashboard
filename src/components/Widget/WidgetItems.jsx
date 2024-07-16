/* eslint-disable no-unused-vars */
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
import SideForm from "./SideForm";
import Swal from "sweetalert2";

const WidgetItems = ({ items, isItemsLoading }) => {
  const [openForm, setOpenForm] = useState(false);
  const [updatedItems, setUpdatedItems] = useState(!isItemsLoading && items);
  const itemId = useMemo(
    () => updatedItems.map((item) => item.id),
    [updatedItems]
  );
  const [formExpand, setFormExpand] = useState(false);
  const [addNewForm, setAddNewForm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleInputChange = (id, field, value) => {
    setUpdatedItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  // handler for save and update data
  const onSubmit = async (data) => {
    if (Object.keys(data).length !== 0) {
      const itemOrder = updatedItems.length + 1;
      const item = { ...data, item_order: itemOrder, expanded: formExpand };

      try {
        const response = await axiosInstance.post("/items", item);
        if (response.data.success) {
          showSuccessMessage("New item added successfully");
          reset();
          setOpenForm(false);
          setUpdatedItems((prevItems) => [...prevItems, response.data.data]);
        }
      } catch (error) {
        showErrorMessage(error.response.data.message);
        reset();
        return;
      }
    }

    // Filter and handle new items (with "new-" IDs)
    const newItems = updatedItems.filter((item) =>
      String(item.id).startsWith("new-")
    );

    for (const newItem of newItems) {
      try {
        const response = await axiosInstance.post("/items", newItem);

        if (response.data.success) {
          // Replace the new item with the item from the response
          setUpdatedItems((prevItems) =>
            prevItems.map((item) =>
              item.id === newItem.id ? response.data.data : item
            )
          );
        }
      } catch (error) {
        showErrorMessage(error.response.data.message);
      }
    }

    // Handle updating existing items
    const existingItems = updatedItems.filter(
      (item) => !String(item.id).startsWith("new-")
    );

    try {
      const response = await axiosInstance.put("/items", existingItems);
      if (response.data.success) {
        showSuccessMessage("Items updated successfully");
        reset();
        setOpenForm(false);
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
      reset();
    }

    // Update item order
    try {
      await axiosInstance.put("/items/order", updatedItems);
    } catch (error) {
      console.error("Failed to update order:", error);
    }
  };

  // handler for dragging handle
  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over) return;

    // Check if there's any incomplete new item
    const incompleteNewItem = updatedItems.find(
      (item) =>
        String(item.id).startsWith("new-") &&
        (!item.username ||
          !item.job_title ||
          !item.email ||
          !item.department_id)
    );

    if (active.id === "username" && over.id !== "username") {
      if (openForm || incompleteNewItem) {
        Swal.fire({
          icon: "error",
          title: "Please fill up the form first",
        });
        return;
      }
      setUpdatedItems((prevItems) => {
        const newIndex = prevItems.findIndex((item) => item.id === over.id);
        const newItem = {
          id: `new-${Date.now()}`, // Ensure a unique id for the new item
          username: "",
          job_title: "",
          email: "",
          department_id: "",
          expanded: true,
          item_order: newIndex + 1, // Set the item order to the new index position
        };
        const newItems = [...prevItems];
        newItems.splice(newIndex, 0, newItem);
        return newItems.map((item, index) => ({
          ...item,
          item_order: index + 1,
        }));
      });

      setAddNewForm(true);
    } else if (active.id !== over.id) {
      const oldIndex = updatedItems.findIndex((item) => item.id === active.id);
      const newIndex = updatedItems.findIndex((item) => item.id === over.id);
      const newOrder = arrayMove(updatedItems, oldIndex, newIndex);
      setUpdatedItems(
        newOrder.map((item, index) => ({ ...item, item_order: index + 1 }))
      );
    }
  };

  // handler for add button
  const handleAdd = () => {
    const incompleteNewItem = updatedItems.find(
      (item) =>
        String(item.id).startsWith("new-") &&
        (!item.username ||
          !item.job_title ||
          !item.email ||
          !item.department_id)
    );

    if (addNewForm || incompleteNewItem) {
      Swal.fire({
        icon: "error",
        title: "Please fill up the form first",
      });
      return;
    } else {
      setOpenForm(true);
    }
  };

  return (
    <div>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="flex gap-10 justify-around">
          <div className="mt-10 h-[300px]">
            <SideForm />
          </div>
          <div>
            <div>
              <button onClick={handleAdd} className="btn btn-primary my-5 mr-5">
                Add
              </button>

              <button
                onClick={handleSubmit(onSubmit)}
                className="btn btn-primary"
              >
                Save
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
                  setAddNewForm={setAddNewForm}
                />
              ))}
            </SortableContext>
          </div>
        </div>
      </DndContext>
    </div>
  );
};

export default WidgetItems;

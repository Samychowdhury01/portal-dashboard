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
import { FaRegSave } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoAdd } from "react-icons/io5";

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
    console.log(data);
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
      // setUpdatedItems(
      //   newOrder.map((item, index) => ({ ...item, item_order: index + 1 }))
      // );
      setUpdatedItems(newOrder);
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
            <SideForm  />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-5">
              <button onClick={handleAdd} className="btn btn-circle border-primary text-gray-700 hover:btn-primary hover:-opacity-10">
              <IoAdd  className="text-xl"/>
              </button>

              <button
                onClick={handleSubmit(onSubmit)}
                className="btn btn-circle border-primary text-gray-700 hover:btn-primary hover:-opacity-10"
              >
                <FaRegSave className="text-xl"/>
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

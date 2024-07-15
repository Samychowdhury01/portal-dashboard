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
        }
      } catch (error) {
        showErrorMessage(error.response.data.message);
        reset();
        return;
      }
    }

    try {
      const extractIdFromItems = updatedItems.filter(async (item) => {
        const id = String(item?.id);
        const is = id.split("-");
        console.log({ id }, { is });
        if (id.startsWith("new-")) {
          const { id, ...restData } = item;
          console.log(item);
          try {
            const response = await axiosInstance.post("/items", item);
            console.log(response.data);
            if (response.data.success) {
              reset();
              setAddNewForm(false);
            }
          } catch (error) {
            showErrorMessage(error.response.data.message);
            reset();
          }
        }
      });
      const response = await axiosInstance.put("/items", updatedItems);
      if (response.data.success) {
        showSuccessMessage("Items updated successfully");
        reset();
        setOpenForm(false);
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
      reset();
    }

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

    if (active.id === "username" && over.id !== "username") {
      if (addNewForm || openForm) {
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
    if (addNewForm) {
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
              {/* <button
                onClick={() => {
                  if (addNewForm) {
                    Swal.fire({
                      icon: "error",
                      title: "Please fill up the form first",
                    });
                    return;
                  }
                  setAddNewForm(true);
                }}
                className="btn btn-primary my-5 mr-5"
              >
                Add
              </button> */}
              <button
                onClick={handleAdd}
                className="btn btn-primary my-5 mr-5"
              >
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

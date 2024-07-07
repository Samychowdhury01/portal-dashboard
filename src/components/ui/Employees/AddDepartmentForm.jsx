import { useForm } from "react-hook-form";
import { useState } from "react";
import Input from "../Input";
import axiosInstance from "../../../utils/axiosInstance";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../utils/showMessages";
import Loader from "../shared/Loader";

const AddDepartmentForm = ({ setShow, setData }) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.post("/departments", data);
      if (response.data?.success) {
        showSuccessMessage("You have successfully created a Department");
        setShow(false); // Hide the form after successful submission
        reset();
        setIsLoading(false);
        // Update state to remove the deleted department
        setData((prevDepartments) => [...prevDepartments, response.data.data]);
      }
    } catch (error) {
      if (error.response) {
        showErrorMessage(error.response.data.message);
      } else {
        const errorMessage = error.message || "An error occurred";
        showErrorMessage(errorMessage);
      }
      setIsLoading(false);
    }
  };

  return (
    <form
      className="flex items-center gap-20"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        type="text"
        placeholder="Department ID"
        register={register}
        name="id"
        error={errors.id}
      />
      <Input
        type="text"
        placeholder="Department Name"
        register={register}
        name="name"
        error={errors.name}
      />
      <div className="flex-1 flex items-center justify-center gap-4">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setShow(false)}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary text-white">
          {isLoading ? <Loader /> : "Add"}
        </button>
      </div>
    </form>
  );
};

export default AddDepartmentForm;

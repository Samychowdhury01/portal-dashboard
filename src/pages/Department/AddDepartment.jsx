import { useForm } from "react-hook-form";
import Input from "../../components/ui/Input";
import axiosInstance from "../../utils/axiosInstance";
import Swal from "sweetalert2";
import { useState } from "react";
import SubmitBtn from "../../components/ui/SubmitBtn";
import { showErrorMessage, showSuccessMessage } from "../../utils/showMessages";

const AddDepartment = () => {
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
        showSuccessMessage("You have successfully created a Department")
        setIsLoading(false);
      }
    } catch (error) {
      if (error.response) {
        showErrorMessage(error.response.data.message)
        reset();
        setIsLoading(false);
      } else {
        const errorMessage = error.message || "An error occurred"
        showErrorMessage(errorMessage)
        reset();
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <h3 className="text-2xl text-center font-semibold text-gray-700">
        Create Department
      </h3>
      <form
        className="flex flex-col p-4 shadow-xl rounded-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          type="text"
          placeholder="Department ID"
          register={register}
          name="id"
          label="Department ID"
          error={errors.id}
        />
        <Input
          type="text"
          placeholder="Department Name"
          register={register}
          name="name"
          label="Department Name"
          error={errors.name}
        />

        <SubmitBtn isLoading={isLoading} />
      </form>
    </>
  );
};

export default AddDepartment;

/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import axiosInstance from "../../../utils/axiosInstance";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../utils/showMessages";
import Input from "../Input";
import Loader from "../shared/Loader";
import { useState } from "react";

const EmployeeForm = ({
  setAddEmployeeToggle,
  fetchEmployees,
  departments,
}) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.post("/employees", data);
      if (response.data?.success) {
        showSuccessMessage("You have successfully created an Employee");
        setIsLoading(false);
        setAddEmployeeToggle(false);
        reset();
        fetchEmployees();
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
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center gap-4 p-4"
    >
      <Input
        type="text"
        placeholder="First Name"
        register={register}
        name="firstName"
        error={errors.firstName}
      />
      <Input
        type="text"
        placeholder="Last Name"
        register={register}
        name="lastName"
        error={errors.lastName}
      />
      <Input
        type="email"
        placeholder="Email"
        register={register}
        name="email"
        error={errors.email}
      />
      <Input
        type="text"
        placeholder="Job Title"
        register={register}
        name="jobTitle"
        error={errors.jobTitle}
      />
      <select
        {...register("departmentId")}
        className="select select-bordered border-gray-300 focus:outline-none"
      >
        <option value="">Select Department</option>
        {departments?.map((dept) => (
          <option key={dept.id} value={dept.id}>
            {dept.name}
          </option>
        ))}
      </select>
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setAddEmployeeToggle(false)}
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

export default EmployeeForm;

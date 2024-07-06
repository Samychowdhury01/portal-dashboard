import { useForm } from "react-hook-form";
import Input from "../../components/ui/Input";
import SubmitBtn from "../../components/ui/SubmitBtn";
import useFetchData from "../../hooks/useFetchData";
import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { showErrorMessage, showSuccessMessage } from "../../utils/showMessages";

const CreateEmployee = () => {
  const { data: departments } = useFetchData("/departments");
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.post("/employees", data);
      if (response.data?.success) {
        showSuccessMessage("You have successfully created a Employee");
        setIsLoading(false);
      }
    } catch (error) {
      if (error.response) {
        showErrorMessage(error.response.data.message);
        reset();
        setIsLoading(false);
      } else {
        const errorMessage = error.message || "An error occurred";
        showErrorMessage(errorMessage);
        setIsLoading(false);
        reset();
      }
    }
  };

  return (
    <>
      <h3 className="text-2xl text-center font-semibold text-gray-700">
        Add Employee
      </h3>
      <form
        className="flex flex-col p-4 shadow-xl rounded-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          type="text"
          placeholder="First Name"
          register={register}
          name="firstName"
          label="First Name"
          error={errors.firstName}
        />
        <Input
          type="text"
          placeholder="Last Name"
          register={register}
          name="lastName"
          label="Last Name"
          error={errors.lastName}
        />
        <Input
          type="email"
          placeholder="Email"
          register={register}
          name="email"
          label="Email"
          error={errors.email}
        />
        {/* <Input
          type="text"
          placeholder="Employee Name"
          register={register}
          name="employeeName"
          label="Employee Name"
          error={errors.username}
        /> */}
        <Input
          type="text"
          placeholder="Job Title"
          register={register}
          name="jobTitle"
          label="Job Title"
          error={errors.jobTitle}
        />
        <div className="mb-4">
          <label
            className="block text-gray-700 text-base font-medium mb-2"
            htmlFor="departments"
          >
            Department ID
          </label>
          <select
            className="select  select-bordered border-gray-300 focus:outline-none w-full"
            {...register("departmentId", { required: true })}
          >
            {departments.map((department) => (
              <option key={department.id} value={department.id}>
                {`${department.id}(${department.name})`}
              </option>
            ))}
          </select>
          {errors.departmentId && (
            <p className="text-red-500 text-xs mt-1">
              Something went wrong! try again.
            </p>
          )}
        </div>

        <SubmitBtn isLoading={isLoading} />
      </form>
    </>
  );
};

export default CreateEmployee;

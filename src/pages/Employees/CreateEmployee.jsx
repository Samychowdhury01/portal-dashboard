import { useForm } from "react-hook-form";
import Input from "../../components/ui/Input";

const CreateEmployee = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
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
        <Input
          type="text"
          placeholder="Employee Name"
          register={register}
          name="employeeName"
          label="Employee Name"
          error={errors.username}
        />
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
          <option value="111">111</option>
          <option value=" 112"> 112</option>
          <option value=" 113"> 113</option>
        </select>
       {errors.departmentId && (
        <p className="text-red-500 text-xs mt-1">Something went wrong! try again.</p>
      )}
    </div>
       

        <input
          type="submit"
          className="btn btn-primary text-white w-full lg:w-1/6  lg:mx-auto"
        />
      </form>
    </>
  );
};

export default CreateEmployee;

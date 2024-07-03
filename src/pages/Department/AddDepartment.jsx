import { useForm } from "react-hook-form";
import Input from "../../components/ui/Input";

const AddDepartment = () => {
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
            name="departmentId"
            label="Department ID"
            error={errors.firstName}
          />
          <Input
            type="text"
            placeholder="Department Name"
            register={register}
            name="departmentName"
            label="Department Name"
            error={errors.middleName}
          />

          <input
            type="submit"
            className="btn btn-primary text-white w-full lg:w-1/6  lg:mx-auto"
          />
        </form>
      </>
    </>
  );
};

export default AddDepartment;

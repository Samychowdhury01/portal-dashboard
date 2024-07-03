import { useForm } from "react-hook-form";
import Input from "../../components/ui/Input";

const AddUser = () => {
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
        Add User
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
          placeholder="Middle Name"
          register={register}
          name="middleName"
          label="Middle Name"
          error={errors.middleName}
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
          placeholder="Username"
          register={register}
          name="username"
          label="Username"
          error={errors.username}
        />
        <Input
          type="password"
          placeholder="Password"
          register={register}
          name="password"
          label="Password"
          error={errors.password}
        />
        <Input
          type="text"
          placeholder="Job Title"
          register={register}
          name="jobTitle"
          label="Job Title"
          error={errors.jobTitle}
        />
        <Input
          type="text"
          placeholder="Domain Name"
          register={register}
          name="domainName"
          label="Domain Name"
          error={errors.domainName}
        />
        <input
          type="submit"
          className="btn btn-primary text-white w-full lg:w-1/6  lg:mx-auto"
        />
      </form>
    </>
  );
};

export default AddUser;

import { useForm, Controller } from "react-hook-form";
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
    <h3 className="text-2xl text-center font-semibold text-gray-700">Add User</h3>
      <form className="flex flex-col p-4 shadow-xl rounded-lg" onSubmit={handleSubmit(onSubmit)}>
      <Input type="text" placeholder="First Name" register={register} name="firstName" label="First Name" />
      <Input type="text" placeholder="Middle Name" register={register} name="MiddleName"  label="Middle Name"/>
      <Input type="text" placeholder="Last Name" register={register} name="lastName" label="Last Name" />
      <Input type="email" placeholder="email" register={register} name="email" label="Email" />
      <Input type="text" placeholder="username" register={register} name="username"  label="Username"/>
      <Input type="password" placeholder="password" register={register} name="password"  label="Password"/>
      <Input type="text" placeholder="Job Title" register={register} name="jobTitle" label="Job Title" />
      <Input type="text" placeholder="Domain Name" register={register} name="domainName"  label="Domain Name"/>

        <input type="submit" className="btn btn-primary text-white w-1/6 mx-auto" />
      </form>
    </>
  );
};

export default AddUser;

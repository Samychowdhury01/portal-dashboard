import { useForm } from "react-hook-form";
import Input from "../../components/ui/Input";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    if (data?.email === "admin@gmail.com" && data?.password === "admin") {
      localStorage.setItem("token", "admin");
      navigate("/");
    } else {
      alert("Invalid Credentials");
      navigate("/login");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-5">
        <h3 className="text-2xl text-center font-semibold text-gray-700">
          Login
        </h3>
        <form
          className="flex flex-col p-4 shadow-xl rounded-lg"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            type="email"
            placeholder="Email"
            register={register}
            name="email"
            label="Email"
            error={errors.email}
          />
          <Input
            type="password"
            placeholder="Password"
            register={register}
            name="password"
            label="Password"
            error={errors.password}
          />

          <button className="btn btn-primary text-white">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

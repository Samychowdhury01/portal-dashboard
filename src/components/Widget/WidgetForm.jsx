import DepartmentSelect from "../ui/shared/DepartmentSelect";
import WidgetFormInput from "./WidgetFormInput";

const WidgetForm = ({
  setOpenForm,
  register,
  expand,
  setExpand,
  errors,
  reset,
}) => {
  // to delete the input box
  const handleDelete = () => {
    reset();
    setOpenForm(false);
  };

  const handleExpand = (e) => {
    e.preventDefault();
    setExpand(!expand);
  };
  return (
    <div
      className={`p-3 border-2 border-primary transition-all ease-in-out duration-300 rounded-lg shadow-lg ${
        expand ? "w-full" : "w-[800px]"
      }`}
    >
      {/* button div */}
      <div className="flex items-center justify-end gap-5">
        <button onClick={handleExpand} className="btn btn-primary">
          Expand
        </button>
        <button onClick={handleDelete} className="btn btn-secondary">
          Delete
        </button>
      </div>
      {/* form */}
      <form>
        <WidgetFormInput
          name="username"
          register={register}
          placeholder="username"
          label="Username"
          error={errors.username}
        />

        <div className="flex items-center gap-4 my-5">
          <WidgetFormInput
            name="jobTitle"
            placeholder="jobTitle"
            label="Job Title"
            register={register}
            error={errors.jobTitle}
          />

          <WidgetFormInput
            name="email"
            placeholder="Email"
            label="Email"
            register={register}
            error={errors.email}
          />

          <div>
            <DepartmentSelect register={register} error={errors.departmentId} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default WidgetForm;

import DepartmentSelect from "../ui/shared/DepartmentSelect";
import WidgetFormInput from "./WidgetFormInput";

const WidgetForm = ({
  setOpenForm,
  register,
  formExpand,
  errors,
  reset,
  setFormExpand,
}) => {
  // to delete the input box
  const handleDelete = (e) => {
    e.preventDefault();
    reset();
    setOpenForm(false);
  };

  // handle expand
  const handleExpand = (e) => {
    e.preventDefault();
    setFormExpand(!formExpand);
  };
  return (
    <div
      className={`p-3 border-2 border-primary transition-all ease-in-out duration-300 rounded-lg shadow-lg ${
        formExpand ? "w-full" : "w-[800px]"
      }`}
    >
      {/* form */}
      <form>
        {/* button div */}
        <div className="flex items-center justify-end gap-5">
          <button onClick={handleExpand} className="btn btn-primary">
            Expand
          </button>
          <button onClick={handleDelete} className="btn btn-secondary">
            Delete
          </button>
        </div>
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

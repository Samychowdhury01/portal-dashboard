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
  
    const handleExpand = (e) =>{
      e.preventDefault()
      setExpand(!expand)
    }
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
          <div>
            <label className=" text-gray-700 text-base font-medium m-2">
              Username
            </label>
            <input
              className="input input-bordered"
              type="text"
              id="username"
              placeholder="username"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && (
              <p className="text-red-500">{errors.username.message}</p>
            )}
          </div>
  
          <div className="flex items-center gap-4 my-5">
            <div>
              <label className="block text-gray-700 text-base font-medium mb-2">
                Job Title
              </label>
              <input
                className="input input-bordered"
                type="text"
                placeholder="jobTitle"
                {...register("jobTitle", { required: "Job Title is required" })}
                id="jobTitle"
              />
              {errors.jobTitle && (
                <p className="text-red-500">{errors.jobTitle.message}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-base font-medium mb-2">
                Email
              </label>
              <input
                className="input input-bordered"
                type="email"
                placeholder="email"
                {...register("email", { required: "Email is required" })}
                id="email"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-base font-medium mb-2">
                Department
              </label>
              <select
                className="input input-bordered"
                {...register("departments", {
                  required: "Department is required",
                })}
              >
                <option value="HR">HR</option>
              </select>
              {errors.departments && (
                <p className="text-red-500">{errors.departments.message}</p>
              )}
            </div>
          </div>
        </form>
      </div>
    );
  };
  
  export default WidgetForm;
  
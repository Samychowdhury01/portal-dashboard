const WidgetFormInput = ({
  register,
  error,
  label,
  placeholder,
  name,
  handleChange,
  defaultValue,
  isItemInput,
  isDragging,
}) => {
  return (
    <div>
      <label className={`label-text ${isDragging && "text-white"}`}>
        {label}
      </label>
      {isItemInput ? (
        <input
          className="input input-bordered"
          type="text"
          placeholder={placeholder}
          id={name}
          name={name}
          onChange={handleChange}
          defaultValue={defaultValue}
        />
      ) : (
        <input
          className="input input-bordered"
          type="text"
          placeholder={placeholder}
          {...register(name, { required: `${label} is required` })}
          id={name}
        />
      )}
      {error && <p className="text-red-500">{error.message}</p>}
    </div>
  );
};

export default WidgetFormInput;

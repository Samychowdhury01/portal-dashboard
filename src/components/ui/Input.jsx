const Input = ({
  type,
  placeholder,
  register,
  name,
  label,
  error,
  readOnly,
  defaultValue,
}) => {
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-base font-medium mb-2"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        id={name}
        className="input input-bordered border-gray-300 focus:outline-none w-full"
        type={type}
        readOnly={readOnly}
        defaultValue={defaultValue}
        placeholder={placeholder}
        {...register(name, { required: true })}
      />
      {error && (
        <p className="text-red-500 text-xs mt-1">This Field Is Required!.</p>
      )}
    </div>
  );
};

export default Input;

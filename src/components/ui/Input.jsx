const Input = ({ type, placeholder, register, name, label, error }) => {
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
        placeholder={placeholder}
        {...register(name, { required: true })}
      />
       {error && (
        <p className="text-red-500 text-xs mt-1">Something went wrong! try again.</p>
      )}
    </div>
  );
};

export default Input;

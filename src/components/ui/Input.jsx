

const Input = ({ type, placeholder, register, name, label }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        className="input input-bordered border-gray-300 focus:outline-none w-full"
        type={type}
        placeholder={placeholder}
        {...register(name, { required: true })}
      />
    </div>
  );
};

export default Input;

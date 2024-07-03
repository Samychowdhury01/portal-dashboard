import { FaPaperPlane } from "react-icons/fa";

const InviteUser = () => {
  return (
    <div className="flex items-center justify-center lg:h-full">
      <form className="w-full max-w-md p-5 shadow-xl rounded-xl">
        <label
          className="block text-gray-700 text-base font-bold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          id="email"
          className="input input-bordered border-gray-300 focus:outline-none w-full mb-5"
          type="text"
          placeholder="Email"
        />
        <button className="flex items-center justify-center gap-2 btn btn-primary text-white">
          <span>Send</span>
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
};

export default InviteUser;

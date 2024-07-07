import { FaAngleDown } from "react-icons/fa";


const ActionBtn = ({children}) => {
    return (
        <div className="dropdown dropdown-end">
                <label tabIndex={0} className="m-1 flex items-center gap-5">
                  <span>Action</span>
                  <FaAngleDown className="text-xl" />
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    {children}
                  </li>
                </ul>
              </div>
    );
};

export default ActionBtn;
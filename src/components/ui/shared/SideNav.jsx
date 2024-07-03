import { FaPaperPlane } from "react-icons/fa";
import { HiOutlineUserAdd, HiOutlineUsers } from "react-icons/hi";
import { IoFileTrayFullOutline } from "react-icons/io5";
import { LuFileSymlink } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { MdOutlineWidgets } from "react-icons/md";
import { TbDragDrop } from "react-icons/tb";
import ActiveLink from "./ActiveLink";

const SideNav = () => {
  const menuItems = (
    <>
      <li>
        <details>
          <summary className="p-2 text-base">
            <HiOutlineUserAdd />
            User Management
          </summary>
          <ul className="p-2 bg-slate-50 rounded-lg z-50">
            <li>
              <ActiveLink to="/add-user">
                <HiOutlineUserAdd /> Add User
              </ActiveLink>
            </li>
            <li>
              <ActiveLink to="/users">
                <HiOutlineUsers /> All User
              </ActiveLink>
            </li>
            <li>
              <ActiveLink to="/invite">
                <FaPaperPlane /> Invite User
              </ActiveLink>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <details>
          <summary className="p-2 text-base">
            <IoFileTrayFullOutline /> Departments
          </summary>
          <ul className="p-2 bg-slate-50 rounded-lg z-50">
            <li>
              <ActiveLink to="/departments">
                <IoFileTrayFullOutline /> Departments
              </ActiveLink>
            </li>
            <li>
              <ActiveLink to="/add-department">
                <LuFileSymlink />
                Create Department
              </ActiveLink>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <details>
          <summary className="p-2 text-base">
            <HiOutlineUsers /> Employees
          </summary>
          <ul className="bg-slate-50 rounded-lg z-50">
            <li>
              <ActiveLink to="/employees">
                <HiOutlineUsers />
                Employees
              </ActiveLink>
            </li>
            <li>
              <ActiveLink to="/add-employee">
                <HiOutlineUserAdd />
                Add Employee
              </ActiveLink>
            </li>
          </ul>
        </details>
      </li>
      <li className="p-2 text-base">
        <ActiveLink to="/drag">
          <TbDragDrop />
          Drag and Drop
        </ActiveLink>
      </li>
      <li className="p-2 text-base">
        <ActiveLink to="/widget">
          <MdOutlineWidgets />
          Widget
        </ActiveLink>
      </li>
      <li className="p-2 text-base">
        <ActiveLink to="/profile">
          <CgProfile />
          Profile
        </ActiveLink>
      </li>
    </>
  );

  return (
    <div className="relative lg:w-full bg-slate-100 lg:h-[800px] drop-shadow-lg rounded-md lg:overflow-y-hidden z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-slate-100 rounded-box z-50 mt-3 w-[250px] lg:w-full shadow"
          >
            {menuItems}
          </ul>
        </div>
      </div>
      <div className="hidden lg:flex">
        <ul className="menu menu-vertical w-full">{menuItems}</ul>
      </div>
    </div>
  );
};

export default SideNav;

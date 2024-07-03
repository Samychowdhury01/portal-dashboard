import { FaPaperPlane } from "react-icons/fa";
import { HiOutlineUserAdd, HiOutlineUsers } from "react-icons/hi";
import ActiveLink from "./ActiveLink";

const SideNav = () => {
  const menuItems = (
    <>
      {/* user Management */}
      <li>
        <details>
          <summary className="p-2 text-base">User Management</summary>
          <ul className="p-2 bg-slate-50 rounded-lg">
            <li>
              <ActiveLink to="/">
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
      {/* Department */}
      <li>
        <details>
          <summary className="p-2 text-base">Departments</summary>
          <ul className="p-2 bg-slate-50 rounded-lg">
            <li>
              <ActiveLink to="/add-user">
                <HiOutlineUserAdd /> Departments
              </ActiveLink>
            </li>
            <li>
              <ActiveLink to="/users">
                <HiOutlineUsers /> Create Department
              </ActiveLink>
            </li>
          </ul>
        </details>
      </li>
      {/* Employees */}
      <li>
        <details>
          <summary className="p-2 text-base">Employees</summary>
          <ul className="p-2 bg-slate-50 rounded-lg">
            <li>
              <ActiveLink to="/add-user">
                <HiOutlineUserAdd />
                Employees
              </ActiveLink>
            </li>
            <li>
              <ActiveLink to="/users">
                <HiOutlineUsers /> Add Employee
              </ActiveLink>
            </li>
          </ul>
        </details>
      </li>
      <li className="p-2 text-base">Drag and Drop</li>
      <li className="p-2 text-base">Widget</li>
      <li className="p-2 text-base">Profile</li>
    </>
  );
  return (
    <>
      <div className="lg:w-full bg-slate-100 max-h-screen drop-shadow-lg rounded-md">
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
              className="menu menu-sm dropdown-content bg-slate-100 rounded-box z-[1] mt-3 w-[250px] lg:w-full shadow"
            >
              {menuItems}
            </ul>
          </div>
        </div>
        <div className="hidden lg:flex">
          <ul className="menu menu-vertical w-full">{menuItems}</ul>
        </div>
      </div>
    </>
  );
};

export default SideNav;

/* eslint-disable react/prop-types */


import { FaPaperPlane } from "react-icons/fa";
import { HiOutlineUserAdd, HiOutlineUsers } from "react-icons/hi";
import { IoFileTrayFullOutline } from "react-icons/io5";
import { LuFileSymlink } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { MdOutlineWidgets } from "react-icons/md";
import { TbDragDrop } from "react-icons/tb";
import ActiveLink from "./ActiveLink";

const SideNavItems = ({ isExpanded, expandedSection }) => {
  return (
    <>
      <li>
        <details open={expandedSection === "user-management"}>
          <summary className="p-2 text-base">
            <HiOutlineUserAdd />
            {isExpanded && "User Management"}
          </summary>
          {isExpanded && (
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
          )}
        </details>
      </li>
      <li>
        <details open={expandedSection === "departments"}>
          <summary className="p-2 text-base">
            <IoFileTrayFullOutline /> {isExpanded && "Departments"}
          </summary>
          {isExpanded && (
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
          )}
        </details>
      </li>
      <li>
        <details open={expandedSection === "employees"}>
          <summary className="p-2 text-base">
            <HiOutlineUsers /> {isExpanded && "Employees"}
          </summary>
          {isExpanded && (
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
          )}
        </details>
      </li>
      <li className="p-2 text-base">
        <ActiveLink to="/drag">
          <TbDragDrop />
          {isExpanded && "Drag and Drop"}
        </ActiveLink>
      </li>
      <li className="p-2 text-base">
        <ActiveLink to="/widget">
          <MdOutlineWidgets />
          {isExpanded && "Widget"}
        </ActiveLink>
      </li>
      <li className="p-2 text-base">
        <ActiveLink to="/profile">
          <CgProfile />
          {isExpanded && "Profile"}
        </ActiveLink>
      </li>
    </>
  );
};

export default SideNavItems;

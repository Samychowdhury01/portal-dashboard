
import { FaPaperPlane } from "react-icons/fa";
import 
{
  HiOutlineUserAdd,
  HiOutlineUsers,
} from "react-icons/hi";
import ActiveLink from "./ActiveLink";
import { IoFileTrayFullOutline } from "react-icons/io5";
import { LuFileSymlink } from "react-icons/lu";
import { MdOutlineWidgets } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { TbDragDrop } from "react-icons/tb";
const MobileMenu = () => {
    return (
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
};

export default MobileMenu;

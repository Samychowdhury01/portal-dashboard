import { HiOutlineUserAdd, HiOutlineUsers } from "react-icons/hi";
import { IoFileTrayFullOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { MdOutlineWidgets } from "react-icons/md";
import { TbDragDrop } from "react-icons/tb";

const CollapNavItems = ({ toggleExpand }) => {
  return (
    <>
      <li
        className="p-2 text-base"
        onClick={() => toggleExpand("user-management")}
      >
        <p>
          <HiOutlineUserAdd />
        </p>
      </li>
      <li className="p-2 text-base" onClick={() => toggleExpand("departments")}>
        <p>
          <IoFileTrayFullOutline />
        </p>
      </li>
      <li className="p-2 text-base" onClick={() => toggleExpand("employees")}>
        <p>
          <HiOutlineUsers />
        </p>
      </li>
      <li className="p-2 text-base" onClick={() => toggleExpand(null)}>
        <p>
          <TbDragDrop />
        </p>
      </li>
      <li className="p-2 text-base" onClick={() => toggleExpand(null)}>
        <p>
          <MdOutlineWidgets />
        </p>
      </li>
      <li className="p-2 text-base" onClick={() => toggleExpand(null)}>
        <p>
          <CgProfile />
        </p>
      </li>
    </>
  );
};

export default CollapNavItems;

// const collapsedNav = (

// );

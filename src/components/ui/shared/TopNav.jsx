import { HiBell, HiClipboardCheck, HiHome } from "react-icons/hi";
import ActiveLink from "./ActiveLink";
import { MdEmail } from "react-icons/md";

const TopNav = () => {
    const navItems = <>
    <li>
              <ActiveLink>
                <HiHome className="text-2xl" />
              </ActiveLink>
            </li>
            <li>
              <ActiveLink>
                <HiBell className="text-2xl" />
              </ActiveLink>
            </li>
            <li>
              <ActiveLink>
                <HiClipboardCheck className="text-2xl" />
              </ActiveLink>
            </li>
            <li>
              <ActiveLink>
                <MdEmail className="text-2xl" />
              </ActiveLink>
            </li>
            <div>
          <button className="btn btn-primary text-white">Logout</button>
        </div> 
    </>
  return (
    <>
      <div className="lg:navbar bg-primary bg-opacity-20 shadow-lg rounded-md mb-5">
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 p-2 shadow"
            >
             {navItems}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl font-bold p-0">
            <span className="text-primary">Portal</span> DashBoard
          </a>
        </div>
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {navItems}
          </ul>
        </div>
        {/* <div className="navbar-end">
          <button className="btn btn-primary">Logout</button>
        </div> */}
      </div>
    </>
  );
};

export default TopNav;

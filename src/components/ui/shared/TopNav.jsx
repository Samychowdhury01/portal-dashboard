import { HiBell, HiClipboardCheck, HiHome } from "react-icons/hi";
import ActiveLink from "./ActiveLink";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const TopNav = () => {
  const navigate = useNavigate()
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    navigate("/login")

  };
  const navItems = (
    <>
      <li>
        <ActiveLink to="/">
          <HiHome className="text-2xl" />
        </ActiveLink>
      </li>
      <li>
        <ActiveLink to="/--">
          <HiBell className="text-2xl" />
        </ActiveLink>
      </li>
      <li>
        <ActiveLink to="/--">
          <HiClipboardCheck className="text-2xl" />
        </ActiveLink>
      </li>
      <li>
        <ActiveLink to="/message">
          <MdEmail className="text-2xl" />
        </ActiveLink>
      </li>
      <div>
        <button onClick={handleLogout} className="btn btn-primary text-white">
          Logout
        </button>
      </div>
    </>
  );
  return (
    <>
      <div className="lg:navbar bg-primary bg-opacity-15 shadow-lg rounded-md mb-5">
        <div className="navbar-start w-full">
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
          <a className="text-xl font-bold">
            <span className="text-primary">Portal</span> DashBoard
          </a>
        </div>
        <div className="navbar-end hidden lg:flex ">
          <ul className="flex items-center gap-4">{navItems}</ul>
        </div>
      </div>
    </>
  );
};

export default TopNav;

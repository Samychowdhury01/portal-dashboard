import { NavLink } from "react-router-dom";

const Menu = () => {
  return (
    <div>
      <ul className="menu bg-base-200 rounded-box w-56 space-y-5">
        <li>
          <NavLink
            className={({ isActive }) =>
              `text-base ${isActive ? "message-menu" : ""}`
            }
            to="/message"
          >
            Inbox
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              `text-base ${isActive ? "message-menu" : ""}`
            }
            to="/sent"
          >
            Sent
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              `text-base ${isActive ? "message-menu" : ""}`
            }
            to="/draft"
          >
            Draft
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Menu;

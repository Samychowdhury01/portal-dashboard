import { NavLink } from "react-router-dom";

const ActiveLink = ({ children, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `text-base p-0 ${isActive ? "text-primary font-medium" : ""}`
      }
    >
      {children}
    </NavLink>
  );
};

export default ActiveLink;

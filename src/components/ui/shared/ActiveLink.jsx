import { NavLink } from "react-router-dom";

const ActiveLink = ({ children, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `text-base ${isActive ? "text-primary font-medium" : ""}`
      }
    >
      {children}
    </NavLink>
  );
};

export default ActiveLink;

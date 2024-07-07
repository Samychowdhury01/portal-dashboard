/* eslint-disable react/prop-types */
// SideNav.js
import { useState } from "react";
import {
  HiMenu,
 
  HiOutlineX,
} from "react-icons/hi";

import CollapNavItems from "./CollapNavItems";
import SideNavItems from "./SideNavItems";
import MobileMenu from "./MobileMenu";

const SideNav = ({ isExpanded, setIsExpanded }) => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleExpand = (section = null) => {
    if (!isExpanded) {
      setIsExpanded(true);
      setExpandedSection(section);
    } else {
      setIsExpanded(false);
      setExpandedSection(null);
    }
  };
  return (
    <div className="relative lg:w-full bg-slate-100 lg:h-[800px] drop-shadow-lg rounded-md lg:overflow-x-hidden z-50 transition-all ease-in-out duration-500">
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
            <MobileMenu/>
          </ul>
        </div>
      </div>
      <div className="hidden lg:flex flex-col">
        <button
          className={`btn btn-primary px-2 mb-2 text-2xl ${
            isExpanded ? "w-1/6" : "w-full"
          } mx-auto`}
          onClick={() => toggleExpand(null)}
        >
          {isExpanded ? <HiOutlineX /> : <HiMenu />}
        </button>
        <ul
          className={`menu menu-vertical w-full ${
            isExpanded ? "p-2" : "p-0"
          } transition-all ease-in-out duration-500`}
        >
          {isExpanded ? (
            <SideNavItems
              isExpanded={isExpanded}
              expandedSection={expandedSection}
            />
          ) : (
            <CollapNavItems toggleExpand={toggleExpand} />
          )}
        </ul>
      </div>
    </div>
  );
};

export default SideNav;

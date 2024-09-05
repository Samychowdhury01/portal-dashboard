// MainLayout.js
import { Outlet } from "react-router-dom";
import Container from "../ui/Container";
import SideNav from "../ui/shared/SideNav";
import { useState } from "react";
import TopNav from "../ui/shared/TopNav";


const MainLayout = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <Container>
      <TopNav />
      <div className="grid lg:grid-cols-12 gap-4">
        <div
          className={`${isExpanded ? "lg:col-span-2" : "w-10"} transition-width`}
          style={{ width: isExpanded ? "100%" : "40%" }} // Tailwind col-span-2 width vs. custom width
        >
          <SideNav isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
        </div>
        <div className="lg:col-span-10 w-full lg:w-[1220px] mx-auto">
          <Outlet />
        </div>
      </div>
    </Container>
  );
};

export default MainLayout;

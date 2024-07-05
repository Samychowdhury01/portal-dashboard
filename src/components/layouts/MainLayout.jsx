import { Outlet } from "react-router-dom";
import Container from "../ui/Container";
import SideNav from "../ui/shared/SideNav";
import TopNav from "../ui/shared/TopNav";

const MainLayout = () => {
  return (
    <Container>
      <TopNav/>
      <div className="grid lg:grid-cols-12 gap-4">
      <div className="lg:col-span-2">
      <SideNav/>
      </div>
      <div className="lg:col-span-10">
      <Outlet />
      </div>
      </div>
    </Container>
  );
};

export default MainLayout;

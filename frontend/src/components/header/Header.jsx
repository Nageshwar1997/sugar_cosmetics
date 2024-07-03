import { useLocation } from "react-router-dom";
import MiddleNavbar from "./MiddleNavbar";
import TopNavbar from "./TopNavbar";

const Header = () => {
  const { pathname } = useLocation();
  return (
    <div className="w-full shadow-md fixed top-0 left-0 right-0">
      {/* Top Nav */}
      {pathname === "/" && <TopNavbar />}
      {/* Middle Nav */}
      <MiddleNavbar />
      {/* Bottom Nav */}
      <div className="w-full h-[53px] bg-[#141414] text-white">Bottom</div>
    </div>
  );
};

export default Header;

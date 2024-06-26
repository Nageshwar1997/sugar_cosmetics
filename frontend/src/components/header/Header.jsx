import MiddleNavbar from "./MiddleNavbar";
import TopNavbar from "./TopNavbar";

const Header = () => {
  return (
    <div className="w-full h-40 shadow-md">
      {/* Top Nav */}
      <TopNavbar />
      {/* Middle Nav */}
      <MiddleNavbar />
      {/* Bottom Nav */}
      <div className="w-full h-[53px] bg-[#141414] text-white">Bottom</div>
    </div>
  );
};

export default Header;

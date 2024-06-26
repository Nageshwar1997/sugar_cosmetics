import TopNavbar from "./TopNavbar";

const Header = () => {
  return (
    <div className="w-full h-40">
      {/* Top Nav */}
      <TopNavbar />
      {/* Middle Nav */}
      <div className="w-full h-[72px] bg-red-200">Middle</div>
      {/* Bottom Nav */}
      <div className="w-full h-[53px] bg-red-300">Bottom</div>
    </div>
  );
};

export default Header;

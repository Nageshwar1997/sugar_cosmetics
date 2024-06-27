import Logo from "./Logo";
import { FaUser } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { LuBadgePercent } from "react-icons/lu";
import { PiBagBold } from "react-icons/pi";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";

const MiddleNavbar = () => {
  return (
    <div className="w-full h-[72px] bg-black flex text-white justify-between items-center px-16">
      <div className="w-md cursor-pointer">
        <Link to={"/"}>
          <Logo />
        </Link>
      </div>
      <div className="flex items-center pl-2 border bg-[#212121] border-solid border-white w-[45%] h-10 rounded-lg">
        <div className="w-full h-full">
          <input
            type="text"
            className="bg-transparent w-full h-full pb-0.5 outline-none"
            placeholder="Search for products, brands and more"
          />
        </div>
        <div className="cursor-pointer flex items-center px-2 space-x-1 font-semibold text-lg rounded-r-lg text-black bg-white h-full">
          <IoSearch size={20} />
          <p>Search</p>
        </div>
      </div>
      <Link
        to={"/login"}
        className="flex items-center space-x-1.5 cursor-pointer text-lg"
      >
        <div className="bg-white text-black rounded-full p-1 text-sm">
          <FaUser />
        </div>
        <p className="hover:text-pink-600">Login/Register</p>
      </Link>
      <div className="flex items-center space-x-4 text-xl font-bold">
        <div className="cursor-pointer hover:text-pink-700">
          <FaRegHeart size={23} />
        </div>
        <div className="cursor-pointer hover:text-pink-700">
          <PiBagBold size={25} />
        </div>
        <div className="cursor-pointer hover:text-pink-700">
          <LuBadgePercent size={23} />
        </div>
      </div>
    </div>
  );
};

export default MiddleNavbar;
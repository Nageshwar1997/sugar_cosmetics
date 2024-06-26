import Logo from "./Logo";
import { FaCircleUser } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { LuBadgePercent } from "react-icons/lu";
import { PiBagBold } from "react-icons/pi";
import { IoSearch } from "react-icons/io5";

const MiddleNavbar = () => {
  return (
    <div className="w-full h-[72px] bg-black flex text-white justify-between items-center px-16">
      <div className="w-md cursor-pointer">
        <Logo />
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
      <div className="flex items-center space-x-2 cursor-pointer text-lg">
        <FaCircleUser size={20} />
        <p className="hover:text-pink-600">Login/Register</p>
      </div>
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

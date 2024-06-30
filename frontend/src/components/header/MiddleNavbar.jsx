import Logo from "./Logo";
import { FaUser } from "react-icons/fa6";
import { FaRegHeart, FaAngleDown } from "react-icons/fa";
import { LuBadgePercent } from "react-icons/lu";
import { PiBagBold } from "react-icons/pi";
import { IoSearch } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../../common";

import { toast } from "react-toastify";
import { useEffect, useState, useRef } from "react";
import { setUserDetails } from "../../store/userSlice";

const MiddleNavbar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user);

  const handleLogout = async () => {
    const response = await fetch(SummaryApi.logoutUser.url, {
      method: SummaryApi.logoutUser.method,
      credentials: "include",
    });

    const responseData = await response.json();

    if (responseData.success) {
      toast.success(responseData.message);
      setShowLogout(false);
      dispatch(setUserDetails(null));
      navigate("/");
    }
  };

  // console.log("user", user);

  // for logout dropdown
  const dropdownRef = useRef(null); // for logout dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowLogout(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="w-full h-[72px] bg-black flex text-white justify-between items-center px-16">
      <div className="max-w-[17%] cursor-pointer">
        <Link to={"/"} className="w-full">
          <Logo />
        </Link>
      </div>
      <div className="flex items-center pl-2 border bg-[#212121] border-solid border-white min-w-[45%] h-10 rounded-lg">
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
      <div className="flex items-center space-x-1 p-1">
        <Link
          to={`${user?._id ? "/account" : "/login"}`}
          className="flex items-center space-x-1.5 cursor-pointer text-lg"
        >
          <div className="bg-white text-black rounded-full p-1 text-sm">
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                alt={user?.firstName}
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <FaUser />
            )}
          </div>
          <p className="hover:text-pink-600 capitalize">
            {user?._id ? `Hi ${user?.firstName}` : "Login/Register"}
          </p>
        </Link>
        <div
          className="cursor-pointer text-lg relative"
          onClick={() => setShowLogout(!showLogout)}
          ref={dropdownRef}
        >
          <span>{user?._id && <FaAngleDown />}</span>

          {showLogout && (
            <div className="absolute top-7 left-0 bg-white text-slate-700 w-40 rounded-lg hover:bg-slate-800 hover:text-white">
              <div
                className="cursor-pointer text-center p-2 rounded-lg"
                onClick={handleLogout}
                onMouseLeave={() => setShowLogout(false)}
              >
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-4 text-xl font-bold p-1">
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

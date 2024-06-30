import React from "react";
import LeftTopTexture from "../assets/textures/AccountBackgroundTexture.jpeg";
import LeftMiddleTexture from "../assets/textures/AccountBgTexture2.png";
import { useSelector } from "react-redux";
import {
  FaBox,
  FaBoxOpen,
  FaBoxes,
  FaGift,
  FaPowerOff,
  FaRegHeart,
  FaRegUserCircle,
  FaUsers,
  FaWhatsapp,
} from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { MdLocationPin } from "react-icons/md";
import JoinClubImage from "../assets/logo.gif";
import PremiumLogo from "../assets/account/premiumLogo.png";
import { Link, Outlet } from "react-router-dom";
const Account = () => {
  const user = useSelector((state) => state?.user?.user);
  // console.log("user", user);
  const LeftTopBackgroundTextureStyle = {
    backgroundImage: `url(${LeftTopTexture})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
  };
  const LeftMiddleBackgroundTextureStyle = {
    backgroundImage: `url(${LeftMiddleTexture})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
  };
  return (
    <div className="w-[95%] mx-[3.6%] my-[1.5%] flex justify-between gap-[1.4%] overflow-y-scroll">
      {/* Left */}
      <div className="w-[23.9%]">
        <div
          className="w-full h-[514px] bg-black rounded-xl"
          style={{ boxShadow: "0 2px 10px hsla(0, 0%, 51%, .1)" }}
        >
          {/* left top */}
          <div
            style={LeftTopBackgroundTextureStyle}
            className="flex items-center gap-2.5 rounded-t-xl p-[18px] text-white"
          >
            <div className="flex flex-col justify-center items-center gap-1 border-r pr-2">
              <div className="w-14 h-14 rounded-full flex justify-center items-center">
                {user?.profilePic ? (
                  <div className="w-full h-full bg-white p-1 rounded-full text-black flex justify-center items-center">
                    <img
                      src={user?.profilePic}
                      alt={user?.firstName}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-full h-full p-1 rounded-full text-slate-200 flex justify-center items-center text-7xl bg-transparent">
                    <FaRegUserCircle />
                  </div>
                )}
              </div>
              <p className="uppercase">{user?.role}</p>
            </div>

            <div className="flex flex-col gap-1 text-slate-200">
              <p className="capitalize font-semibold">
                {user?._id
                  ? user?.firstName + " " + user?.lastName
                  : "Sugar Fan"}
              </p>
              {user?._id && <p>+91 {user?.phone}</p>}
              <p className="text-sm">{user?.email}</p>
            </div>
          </div>

          {/* left middle */}
          <div
            className="w-full h-auto flex justify-center items-center gap-3 text-center text-slate-200 py-3"
            style={LeftMiddleBackgroundTextureStyle}
          >
            <div className="flex flex-col items-center justify-center gap-2.5 mt-2.5">
              <div className="w-full h-14 px-10 flex flex-col items-center justify-center gap-2.5 pt-2.5">
                <img
                  src={JoinClubImage}
                  alt="Join"
                  className="w-full h-full rounded-lg"
                />
              </div>
              <div>Save 20% EXTRA + FREE Shipping</div>
              <div className="flex gap-1 items-center text-pink-600">
                <span>BECOME A</span>
                <div className="flex items-center gap-1">
                  <div className="flex items-center bg-white rounded-full px-1">
                    <img
                      src={PremiumLogo}
                      alt="Prime"
                      className="w-5 h-5 bg-transparent"
                    />
                    MEMBER
                  </div>
                  <span>NOW {">"}</span>
                </div>
              </div>
            </div>
          </div>
          {/* left bottom */}
          <div
            className="w-full bg-white flex flex-col gap-2 rounded-xl p-4"
            style={{ boxShadow: "0 2px 10px hsla(0, 0%, 51%, .1)" }}
          >
            <>
              <Link
                to={"products"}
                className="flex items-center justify-between p-4 text-black text-lg cursor-pointer border border-slate-400 rounded-md hover:shadow-md"
              >
                <div
                  className="font-normal text-[16px] flex gap-2 text-lg"
                  style={{ lineHeight: "19px" }}
                >
                  <span>
                    <FaBoxes />
                  </span>
                  <span>All Products</span>
                </div>
                <div>
                  <IoIosArrowForward />
                </div>
              </Link>
              <Link
                to={"users"}
                className="flex items-center justify-between p-4 text-black text-lg cursor-pointer border border-slate-400 rounded-md hover:shadow-md"
              >
                <div
                  className="font-normal text-[16px] flex gap-2 text-lg"
                  style={{ lineHeight: "19px" }}
                >
                  <span>
                    <FaUsers />
                  </span>
                  <span>All Users</span>
                </div>
                <div>
                  <IoIosArrowForward />
                </div>
              </Link>
              <nav className="flex items-center justify-between p-4 text-black text-lg cursor-pointer border border-slate-400 rounded-md hover:shadow-md">
                <div
                  className="font-normal text-[16px] flex gap-2 text-lg"
                  style={{ lineHeight: "19px" }}
                >
                  <span>
                    <FaBox />
                  </span>
                  <span>All Orders</span>
                </div>
                <div>
                  <IoIosArrowForward />
                </div>
              </nav>
              <nav className="flex items-center justify-between p-4 text-black text-lg cursor-pointer border border-slate-400 rounded-md hover:shadow-md">
                <div
                  className="font-normal text-[16px] flex gap-2 text-lg"
                  style={{ lineHeight: "19px" }}
                >
                  <span>
                    <FaBoxOpen />
                  </span>
                  <span>Orders</span>
                </div>
                <div>
                  <IoIosArrowForward />
                </div>
              </nav>

              <nav className="flex items-center justify-between p-4 text-black text-lg cursor-pointer border border-slate-400 rounded-md hover:shadow-md">
                <div
                  className="font-normal text-[16px] flex gap-2 text-lg"
                  style={{ lineHeight: "19px" }}
                >
                  <span>
                    <MdLocationPin />
                  </span>
                  <span>Addresses</span>
                </div>
                <div>
                  <IoIosArrowForward />
                </div>
              </nav>
              <nav className="flex items-center justify-between p-4 text-black text-lg cursor-pointer border border-slate-400 rounded-md hover:shadow-md">
                <div
                  className="font-normal text-[16px] flex gap-2 text-lg"
                  style={{ lineHeight: "19px" }}
                >
                  <span>
                    <FaRegHeart />
                  </span>
                  <span>Wishlist</span>
                </div>
                <div>
                  <IoIosArrowForward />
                </div>
              </nav>
              <nav className="flex items-center justify-between p-4 text-black text-lg cursor-pointer border border-slate-400 rounded-md hover:shadow-md">
                <div
                  className="font-normal text-[16px] flex gap-2 text-lg"
                  style={{ lineHeight: "19px" }}
                >
                  <span>
                    <FaWhatsapp />
                  </span>
                  <span>WhatsApp Store</span>
                </div>
                <div>
                  <IoIosArrowForward />
                </div>
              </nav>
              <nav className="flex items-center justify-between p-4 text-black text-lg cursor-pointer border border-slate-400 rounded-md hover:shadow-md">
                <div
                  className="font-normal text-[16px] flex gap-2 text-lg"
                  style={{ lineHeight: "19px" }}
                >
                  <span>
                    <FaGift />
                  </span>
                  <span>Refer & Earn</span>
                </div>
                <div>
                  <IoIosArrowForward />
                </div>
              </nav>
              <nav className="flex items-center justify-between p-4 text-black text-lg cursor-pointer border border-slate-400 rounded-md hover:shadow-md">
                <div
                  className="font-normal text-[16px] flex gap-2 text-lg"
                  style={{ lineHeight: "19px" }}
                >
                  <span>
                    <FaPowerOff />
                  </span>
                  <span>Logout</span>
                </div>
              </nav>
            </>
          </div>
        </div>
      </div>
      {/* Right */}
      <main className="w-[74.66%] h-full">
        <Outlet />
      </main>
    </div>
  );
};

export default Account;

import React from "react";
import LeftTopTexture from "../../assets/textures/AccountBackgroundTexture.jpeg";
import LeftMiddleTexture from "../../assets/textures/AccountBgTexture2.png";
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
import JoinClubImage from "../../assets/logo.gif";
import PremiumLogo from "../../assets/account/premiumLogo.png";
import { Link, Outlet, useLocation } from "react-router-dom";

const Account = () => {
  const currentUser = useSelector((state) => state?.user?.user);
  const { pathname } = useLocation();

  const navigationPaths = pathname.split("/");

  // console.log("Navigation Paths", navigationPaths);

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
    <div className="w-full min-h-[calc(100vh-67px)] grid gap-2 p-2">
      {/* Navigation Bar */}
      <div className="w-lg h-[50px] bg-white flex items-center my-2 px-10 gap-2">
        {navigationPaths.map((path, index) => {
          return (
            <div
              key={index + "path"}
              className="flex justify-center items-center gap-2"
            >
              <Link
                to={`/${path}`}
                className="w-auto h-8 flex justify-between items-center cursor-pointer px-1"
              >
                <p
                  className={`capitalize font-semibold ${
                    index === navigationPaths.length - 1
                      ? "text-black font-bold"
                      : "text-gray-500 hover:text-pink-700"
                  }`}
                >
                  {path ? path : "Home"}
                </p>
              </Link>
              <div className="text-gray-700">
                {index < navigationPaths.length - 1 && <IoIosArrowForward />}
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-[97%] ml-[2.5%] mr-[0.5%] flex justify-between">
        {/* Left */}
        <div className="w-[23.9%] h-[calc(100vh-140px)] flex flex-col justify-between items-center">
          <div
            className="w-full min-h-[300px] bg-black rounded-xl overflow-y-scroll scrollbar-none"
            style={{ boxShadow: "0 2px 10px hsla(0, 0%, 51%, .1)" }}
          >
            {/* left top */}
            <div
              style={LeftTopBackgroundTextureStyle}
              className="flex items-center gap-2.5 rounded-t-xl p-[18px] text-white"
            >
              <div className="flex flex-col justify-center items-center gap-1 border-r pr-2">
                <div className="w-14 h-14 rounded-full flex justify-center items-center">
                  {currentUser?.profilePic ? (
                    <div className="w-full h-full bg-white p-1 rounded-full text-black flex justify-center items-center">
                      <img
                        src={currentUser?.profilePic}
                        alt={currentUser?.firstName}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full p-1 rounded-full text-slate-200 flex justify-center items-center text-7xl bg-transparent">
                      <FaRegUserCircle />
                    </div>
                  )}
                </div>
                <p className="uppercase">{currentUser?.role}</p>
              </div>

              <div className="flex flex-col gap-1 text-slate-200">
                <p className="capitalize font-semibold">
                  {currentUser?._id
                    ? currentUser?.firstName + " " + currentUser?.lastName
                    : "Sugar Fan"}
                </p>
                {currentUser?._id && <p>+91 {currentUser?.phone}</p>}
                <p className="text-sm">{currentUser?.email}</p>
              </div>
            </div>

            {/* left middle */}
            <div
              className="w-full h-auto flex justify-center items-center gap-3 text-center text-slate-200 pb-2.5"
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
                <div className="text-sm">Save 20% EXTRA + FREE Shipping</div>
                <div className="flex gap-1 items-center text-pink-600 text-sm">
                  <span>BECOME A</span>
                  <div className="flex items-center gap-1">
                    <div className="flex items-center bg-white rounded-full px-2 py-0.5">
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
                  className={`${
                    currentUser?.role === "MASTER" ||
                    currentUser?.role === "ADMIN"
                      ? "flex"
                      : "hidden"
                  } items-center justify-between p-4 text-black text-lg cursor-pointer border border-slate-400 rounded-md hover:shadow-md`}
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
        <main className="w-[74.66%] h-[calc(100vh-140px)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Account;

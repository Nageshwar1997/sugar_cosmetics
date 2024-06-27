import React from "react";
import BackgroundTexture from "../assets/loginRegisterPageBackGroundTexture.jpeg";
import LoginRegisterBanner from "../assets/loginRegisterBanner.jpg";
import LoginRegisterPageBackGroundHi from "../assets/loginRegisterPageBackGroundHi.jpeg";

import { Link } from "react-router-dom";
import { HiMiniArrowLongLeft } from "react-icons/hi2";
const Login = () => {
  const BackgroundTextureStyle = {
    backgroundImage: `url(${BackgroundTexture})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "fill",
  };
  return (
    <div className="w-full flex text-[16px] h-[100vh]">
      {/* Left */}
      <div className="w-[38%] h-full bg-[#000] flex items-center overflow-y-hidden">
        <img src={LoginRegisterBanner} alt="Sugar Banner" />
      </div>
      {/* Right */}
      <div
        className="w-[62%] px-[2%] pt-[2%] pb-[7vh] h-full"
        style={BackgroundTextureStyle}
      >
        <div className="bg-red-100 h-[7%] pt-[2%]">
          <svg
            className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium cursor css-vubbuv w-[1em] h-[1em] inline-block fill-current flex-shrink-0 transit"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="KeyboardBackspaceIcon"
          >
            <path d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z"></path>
          </svg>
        </div>
        <div className="bg-red-200 flex text-center flex-col py-[2%] px-[10%] justify-center gap-5 border-dashed border-[1px] border-b-[#bdbdbd]"></div>
        <div className="bg-red-300 flex flex-col justify-between h-[15%] border-dashed border-[1px] border-b-[#bdbdbd] p-[5px]"></div>
        <div className="bg-red-400 p-[5px] font-normal text-[12px] text-center text-[#212121] h-[5%]"></div>
      </div>
    </div>
    // <div className="w-full h-[100vh] flex">
    //   <div className="w-[38%] object-fill">
    //     <img
    //       src={LoginRegisterBanner}
    //       alt="Sugar Banner"
    //       className="w-full h-full"
    //     />
    //   </div>
    //   <div className="w-[62%] h-full relative" style={BackgroundTextureStyle}>
    //     <Link
    //       to={"/"}
    //       className="flex justify-center items-center w-10 h-10 absolute top-4 left-4 text-4xl hover:text-pink-700 cursor-pointer transition-all animate-bounce"
    //     >
    //       <HiMiniArrowLongLeft />
    //     </Link>
    //     <div className="bg-red-600 flex py-[2%] px-[10%] flex-col justify-center gap-[20px] border border-b-[#bdbdbd] h-[73%]">
    //       <div className="h-[35%] text-center bg-gray-300">
    //         <div className="w-full h-[25%] mx-auto">
    //           <img src={LoginRegisterPageBackGroundHi} alt="Hi" className="block w-" />
    //         </div>
    //         <div className="font-bold text-[18px] text-center text-[#212121] h-[25%] m-[2.5%]">
    //           Login Using Email/Phone
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Login;

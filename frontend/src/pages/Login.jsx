import React from "react";
import BackgroundTexture from "../assets/loginRegisterPageBackGroundTexture.jpeg";
import LoginRegisterBanner from "../assets/loginRegisterBanner.jpg";
import LoginRegisterPageBackGroundHi from "../assets/loginRegisterPageBackGroundHi.jpeg";
import LoginBackgroundImage from "../assets/navbarBackgroundImage.png";

import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
const Login = () => {
  const BackgroundTextureStyle = {
    backgroundImage: `url(${BackgroundTexture})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "fill",
  };

  const LoginBackgroundStyle = {
    backgroundImage: `url(${LoginBackgroundImage})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
  };
  return (
    <div className="w-full h-[100vh] flex">
      <div className="w-[38%] object-fill">
        <img
          src={LoginRegisterBanner}
          alt="Sugar Banner"
          className="w-full h-full"
        />
      </div>
      {/* Right Section */}
      <div className="w-[62%] h-full relative" style={BackgroundTextureStyle}>
        <Link
          to={"/"}
          className="flex justify-center items-center w-10 h-10 absolute top-4 left-4 text-2xl hover:text-pink-700 cursor-pointer transition-all animate-ping-1.5s"
        >
          <FaArrowLeftLong />
        </Link>
        <div className="w-full h-full p-10">
          <div className="p-2 max-w-md h-52 mx-auto text-center flex flex-col space-y-3">
            <div className="flex justify-center w-full h-full">
              <img src={LoginRegisterPageBackGroundHi} alt="Hi" />
            </div>
            <p className="text-lg font-bold text-slate-700">
              Login Using Email/Phone Number
            </p>
          </div>
          <div className=" flex flex-col gap-[7%] py-4 px-10 max-w-xl h-[50%] mx-auto">
            <div className="w-full h-[20%] border-2 border-[#bcb9b9] focus-within:border-pink-400 flex items-center justify-center rounded-lg">
              <div className="relative w-full h-[85%] flex justify-center items-center">
                <input
                  type="email"
                  id="email"
                  placeholder="example@ex.com / 9876543210"
                  className="w-full h-full rounded-md px-3 outline-none border-none caret-pink-600 bg-transparent"
                />
                <label
                  for="email"
                  className="absolute -top-[13px] left-3 text-xs text-[rgba(0,0,0,0.6)] px-3 bg-[#f4f1f1] border border-pink-400 rounded-full"
                >
                  Enter Your Email/Phone Number
                </label>
              </div>
            </div>
            <div className="w-full h-[20%] border-2 border-[#bcb9b9] focus-within:border-pink-400 flex items-center justify-center rounded-lg">
              <div className="relative w-full h-[85%] flex justify-center items-center">
                <input
                  type="password"
                  id="password"
                  placeholder="Password must contain at least 8 characters"
                  className="w-full h-full rounded-md px-3 outline-none border-none caret-pink-600 bg-transparent"
                />
                <div className="w-10 h-full flex justify-center items-center cursor-pointer hover:text-pink-700">
                  <FaEye />
                </div>
                <label
                  for="password"
                  className="absolute -top-[13px] left-3 text-xs text-[rgba(0,0,0,0.6)] px-3 bg-[#f4f1f1] border border-pink-400 rounded-full"
                >
                  Enter Your Security Password
                </label>
              </div>
            </div>
            <Link
              to={"/"}
              className="w-full h-[20%] border-2 border-[#bcb9b9] flex items-center justify-center rounded-lg"
              style={LoginBackgroundStyle}
            >
              <button className="w-full h-full rounded-md px-3 outline-none border-none text-white font-bold text-lg">
                Login
              </button>
            </Link>
            <div className="w-full flex justify-between px-2 text-slate-700">
              <p>
                Don't have an account?{" "}
                <Link
                  to={"/register"}
                  className="cursor-pointer text-pink-600 hover:text-pink-700 hover:underline"
                >
                  Register
                </Link>
              </p>
              <p className="cursor-pointer hover:text-pink-700 hover:underline">
                Forgot Password?
              </p>
            </div>
          </div>
          <div className="relative w-full h-[24%] -mt-8">
            <div className="absolute inset-0 border-t border-b border-dashed border-black py-2">
              <div className="w-full px-10 text-center text-sm text-slate-500 mb-4">
                <p>
                  Registering for this site allows you to access your order
                  status and history. Just fill in the above fields, and we'll
                  get a new account set up for you in no time. We will only ask
                  you for information necessary to make the purchase process
                  faster and easier.
                </p>
              </div>
              <hr className="border-dashed border-black" />
              <div className="w-full text-sm text-slate-500 flex items-center justify-center space-x-1 mt-3">
                <input type="checkbox" />
                <p>
                  Get important updates on Whatsapp{" "}
                  <span className="text-pink-600 cursor-pointer hover:text-pink-700 hover:underline">
                    Terms and Conditions
                  </span>
                </p>
              </div>
              <p className="text-base text-slate-500 text-right">
                Need Help?{" "}
                <span className="text-pink-600 cursor-pointer hover:text-pink-700 hover:underline">
                  Contact Us
                </span>
              </p>
            </div>
          </div>
          <>
            <p className="w-full text-sm text-slate-500 text-center mt-1">
              By Signing up or logging in, you agree to our{" "}
              <span className="text-pink-600 cursor-pointer hover:text-pink-700 hover:underline">
                Terms and Conditions
              </span>
            </p>
          </>
        </div>
      </div>
    </div>
  );
};

export default Login;

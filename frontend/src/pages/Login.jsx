import React, { useEffect, useState } from "react";
import BackgroundTexture from "../assets/loginRegisterPageBackGroundTexture.jpeg";
import LoginRegisterBanner from "../assets/loginRegisterBanner.jpg";
import LoginRegisterPageBackGroundHi from "../assets/loginRegisterPageBackGroundHi.jpeg";
import LoginBackgroundImage from "../assets/navbarBackgroundImage.png";

import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  // Styles
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

  // States
  const [showPassword, setShowPassword] = useState(false);
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    phone: "",
    password: "",
  });
  const [selectedLoginOption, setSelectedLoginOption] = useState("email");

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    setLoginDetails((prevDetails) => ({
      ...prevDetails,
      [name]: type === "number" ? +value : value,
    }));
  };
  console.log(loginDetails);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(loginDetails);
  };

  useEffect(() => {
    if (selectedLoginOption === "email") {
      setLoginDetails((prevDetails) => ({
        ...prevDetails,
        phone: "",
      }));
    } else if (selectedLoginOption === "phone") {
      setLoginDetails((prevDetails) => ({
        ...prevDetails,
        email: "",
      }));
    }
  }, [selectedLoginOption]);

  return (
    <section id="login" className="w-full h-[100vh] flex">
      {/* Left Section */}
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
          className="flex justify-center items-center w-10 h-10 absolute top-4 left-4 text-2xl text-slate-600 hover:text-pink-700 cursor-pointer transition-all animate-ping duration-[1500ms]"
        >
          <FaArrowLeftLong />
        </Link>
        <div className="w-full h-full p-10">
          <div className="p-2 max-w-md h-52 mx-auto text-center flex flex-col space-y-3">
            <div className="flex justify-center w-full h-full">
              <img src={LoginRegisterPageBackGroundHi} alt="Hi" />
            </div>
            <div className="text-lg font-bold text-slate-700">
              <div className="flex justify-center space-x-1">
                Login Using:{" "}
                <span className="flex justify-center space-x-1">
                  <span className="flex justify-center items-center gap-1">
                    <input
                      type="radio"
                      className="w-4 ml-1"
                      name="loginOption"
                      value="email"
                      checked={selectedLoginOption === "email"}
                      onChange={() => setSelectedLoginOption("email")}
                    />
                    Email
                  </span>
                  <span className="flex justify-center items-center gap-1">
                    <input
                      type="radio"
                      className="w-4 ml-1"
                      name="loginOption"
                      value="phone"
                      checked={selectedLoginOption === "phone"}
                      onChange={() => setSelectedLoginOption("phone")}
                    />
                    Phone
                  </span>
                </span>
              </div>
            </div>
          </div>
          <form
            onSubmit={handleLogin}
            className="flex flex-col gap-[7%] py-4 px-10 max-w-xl h-[50%] mx-auto"
          >
            <div className="w-full h-[20%] border-2 border-[#bcb9b9] focus-within:border-pink-400 flex items-center justify-center rounded-lg">
              <div className="relative w-full h-full flex justify-center items-center">
                <div className="w-full h-full flex justify-center items-center pl-2">
                  {selectedLoginOption === "phone" ? (
                    <div className="flex w-10 h-full justify-center items-center text-slate-500">
                      <p>+91</p>
                      <hr className="w-[1px] ml-1 h-1/2 bg-slate-500" />
                    </div>
                  ) : null}
                  <input
                    type={selectedLoginOption === "email" ? "email" : "number"}
                    id={selectedLoginOption === "email" ? "email" : "phone"}
                    name={selectedLoginOption === "email" ? "email" : "phone"}
                    placeholder={
                      selectedLoginOption === "email"
                        ? "example@gmail.com"
                        : "1234567890"
                    }
                    autoComplete="off"
                    className="w-full h-full rounded-md px-2 outline-none border-none caret-pink-600 bg-transparent"
                    value={loginDetails[selectedLoginOption]}
                    onChange={handleInputChange}
                  />
                </div>
                <label
                  htmlFor="emailOrPhone"
                  className="absolute -top-[10px] left-3 text-xs text-[rgba(0,0,0,0.6)] px-3 bg-[#e9e6e6] border border-pink-400 rounded-full"
                >
                  Enter Your{" "}
                  {selectedLoginOption === "email" ? "Email" : "Phone Number"}
                </label>
              </div>
            </div>
            <div className="w-full h-[20%] border-2 border-[#bcb9b9] focus-within:border-pink-400 flex items-center justify-center rounded-lg">
              <div className="relative w-full h-full flex justify-center items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  autoComplete="off"
                  placeholder="Password@12345"
                  className="w-full h-full rounded-md px-2 outline-none border-none caret-pink-600 bg-transparent"
                  value={loginDetails.password}
                  onChange={handleInputChange}
                />
                <div className="w-10 h-full flex justify-center items-center cursor-pointer hover:text-pink-700 text-lg">
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    title={showPassword ? "Hide Password" : "Show Password"}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                <label
                  htmlFor="password"
                  className="absolute -top-[10px] left-3 text-xs text-[rgba(0,0,0,0.6)] px-3 bg-[#e9e6e6] border border-pink-400 rounded-full"
                >
                  Enter Your Password
                </label>
              </div>
            </div>
            <div
              className="w-full h-[20%] border-2 border-[#bcb9b9] flex items-center justify-center rounded-lg"
              style={LoginBackgroundStyle}
            >
              <button
                type="submit"
                className="w-full h-full rounded-md px-3 outline-none border-none text-white font-bold text-lg hover:text-xl"
              >
                Login
              </button>
            </div>
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
              <Link
                to={"/forgot-password"}
                className="cursor-pointer hover:text-pink-700 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </form>
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
    </section>
  );
};

export default Login;

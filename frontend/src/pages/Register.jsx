import React, { useState } from "react";
import { toast } from "react-toastify";
import BackgroundTexture from "../assets/textures/loginRegisterPageBackGroundTexture.jpeg";
import RegisterLoginBanner from "../assets/loginRegisterBanner.jpg";
import RegisterBackgroundImage from "../assets/navbarBackgroundImage.png";
import RegisterSugarLogo from "../assets/SLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import imageToBase64 from "../helpers/imageToBase64";
import SummaryApi from "../common";

const Register = () => {
  const BackgroundTextureStyle = {
    backgroundImage: `url(${BackgroundTexture})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "fill",
  };

  const RegisterBackgroundStyle = {
    backgroundImage: `url(${RegisterBackgroundImage})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
  };
  const [showImageSizeWarning, setShowImageSizeWarning] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    profilePic: "",
  });

  const navigate = useNavigate();

  const handleInputChange = async (e) => {
    const { name, value, type, files } = e.target;

    let newValue = value;

    if (type === "file") {
      const selectedImageFile = files[0];
      if (selectedImageFile) {
        try {
          const base64String = await imageToBase64(selectedImageFile);
          newValue = base64String;
        } catch (error) {
          console.error("Error compressing image:", error);
          toast.error("Error compressing image. Please try again.");
          return;
        }
      } else {
        return;
      }
    }

    if (name === "phone") {
      newValue = value.replace(/\D/g, "").slice(0, 10);
    }

    if (
      [
        "firstName",
        "lastName",
        "email",
        "password",
        "confirmPassword",
      ].includes(name)
    ) {
      newValue = value.replace(/\s/g, "");
    }

    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: newValue,
    }));
  };

  const handleKeyPress = (e) => {
    const { charCode } = e;

    if (charCode < 48 || charCode > 57) {
      e.preventDefault();
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!userDetails.firstName) {
      toast.error("First Name Not Provided");
      return;
    }

    if (!userDetails.lastName) {
      toast.error("Last Name Not Provided");
      return;
    }

    if (userDetails.phone.toString().length !== 10) {
      toast.error("Invalid Phone Number");
      return;
    }

    if (userDetails.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    if (userDetails.password !== userDetails.confirmPassword) {
      toast.error("Password & Confirm Password do not match");
      return;
    }

    try {
      const newUserDetails = {
        ...userDetails,
        phone: userDetails.phone,
      };
      const response = await fetch(SummaryApi.registerUser.url, {
        method: SummaryApi.registerUser.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserDetails),
      });

      const responseData = await response.json();

      console.log("ResponseData", responseData);
      if (responseData.success) {
        toast.success(responseData.message);
        navigate("/login");
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log("Error", error);
    }
  };

  return (
    <section id="register" className="w-full h-[100vh] flex">
      {/* Left Section */}
      <div className="w-[38%] object-fill">
        <img
          src={RegisterLoginBanner}
          alt="Sugar Banner"
          className="w-full h-full"
        />
      </div>
      {/* Right Section */}
      <div className="w-[62%] h-full relative" style={BackgroundTextureStyle}>
        <Link
          to={"/login"}
          className="flex justify-center items-center w-10 h-10 absolute top-4 left-4 text-2xl text-slate-600 hover:text-pink-700 cursor-pointer"
        >
          <FaArrowLeftLong />
        </Link>
        <div className="w-full h-full px-10 py-3">
          {/* Upload Image Section */}
          <div className="relative w-full h-auto grid place-items-center">
            <div className="relative mx-auto rounded-full flex justify-center items-center w-[100px] h-[100px] overflow-hidden bg-white">
              <label
                htmlFor="profilePic"
                className="cursor-pointer w-full h-full"
                onMouseOver={() => setShowImageSizeWarning(true)}
                onMouseOut={() => setShowImageSizeWarning(false)}
              >
                <div className="w-full h-full flex justify-center items-center">
                  <img
                    src={userDetails.profilePic || RegisterSugarLogo}
                    alt="Sugar Logo"
                    className="rounded-full object-cover w-full h-full"
                  />
                </div>
                <form>
                  <div className="text-xs flex justify-center items-center w-full pb-3 bg-slate-200 absolute bottom-0 left-0 text-black rounded-full">
                    Upload Photo
                  </div>
                  <input
                    type="file"
                    id="profilePic"
                    name="profilePic"
                    className="hidden"
                    onChange={handleInputChange}
                  />
                </form>
              </label>
            </div>
            <p
              className={`text-red-500 absolute -bottom-1 text-xs ${
                showImageSizeWarning ? "block" : "hidden"
              }`}
            >
              Image size should be less than 60 kb
            </p>
          </div>
          <form
            onSubmit={handleRegister}
            className="grid gap-4 w-full max-w-xl p-5 mx-auto mt-6 rounded-lg shadow-lg mb-2"
          >
            <div className="flex gap-3 w-full h-10">
              <div className="w-full h-10 border-2 border-[#bcb9b9] focus-within:border-pink-400 flex items-center justify-center rounded-lg">
                <div className="relative w-full h-full flex justify-center items-center">
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="Ex. John"
                    className="w-full h-full rounded-md px-2 outline-none border-none caret-pink-600 bg-transparent shadow-md"
                    value={userDetails.firstName}
                    onChange={handleInputChange}
                  />
                  <label
                    htmlFor="firstName"
                    className="absolute -top-[10px] left-3 text-xs text-[rgba(0,0,0,0.6)] px-3 bg-[#e9e6e6] border border-pink-400 rounded-full"
                  >
                    Enter First Name
                  </label>
                </div>
              </div>
              <div className="w-full h-10 border-2 border-[#bcb9b9] focus-within:border-pink-400 flex items-center justify-center rounded-lg">
                <div className="relative w-full h-full flex justify-center items-center">
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Ex. Doe"
                    className="w-full h-full rounded-md px-2 outline-none border-none caret-pink-600 bg-transparent shadow-md"
                    value={userDetails.lastName}
                    onChange={handleInputChange}
                  />
                  <label
                    htmlFor="lastName"
                    className="absolute -top-[10px] left-3 text-xs text-[rgba(0,0,0,0.6)] px-3 bg-[#e9e6e6] border border-pink-400 rounded-full"
                  >
                    Enter Last Name
                  </label>
                </div>
              </div>
            </div>
            <div className="w-full h-10 border-2 border-[#bcb9b9] focus-within:border-pink-400 flex items-center justify-center rounded-lg">
              <div className="relative w-full h-full flex justify-center items-center px-2">
                <div className="flex w-10 h-full justify-center items-center text-slate-500">
                  <p>+91</p>
                  <hr className="w-[1px] ml-1 h-1/2 bg-slate-500" />
                </div>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder="Ex. 1234567890"
                  className="w-full h-full rounded-md pl-1 outline-none border-none caret-pink-600 bg-transparent shadow-md"
                  value={userDetails.phone}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                />

                <label
                  htmlFor="phone"
                  className="absolute -top-[10px] left-3 text-xs text-[rgba(0,0,0,0.6)] px-3 bg-[#e9e6e6] border border-pink-400 rounded-full"
                >
                  Enter Your Phone No.
                </label>
              </div>
            </div>
            <div className="w-full h-10 border-2 border-[#bcb9b9] focus-within:border-pink-400 flex items-center justify-center rounded-lg">
              <div className="relative w-full h-full flex justify-center items-center">
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Ex. sample@gmail.com"
                  className="w-full h-full rounded-md px-2 outline-none border-none caret-pink-600 bg-transparent shadow-md"
                  value={userDetails.email}
                  onChange={handleInputChange}
                />

                <label
                  htmlFor="email"
                  className="absolute -top-[10px] left-3 text-xs text-[rgba(0,0,0,0.6)] px-3 bg-[#e9e6e6] border border-pink-400 rounded-full"
                >
                  Enter Your Email
                </label>
              </div>
            </div>
            <div className="w-full h-10 border-2 border-[#bcb9b9] focus-within:border-pink-400 flex items-center justify-center rounded-lg">
              <div className="relative w-full h-full flex justify-center items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Password@12345"
                  className="w-full h-full rounded-md px-2 outline-none border-none caret-pink-600 bg-transparent shadow-md"
                  value={userDetails.password}
                  onChange={handleInputChange}
                  autoComplete="off"
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
                  Enter Password
                </label>
              </div>
            </div>
            <div className="w-full h-10 border-2 border-[#bcb9b9] focus-within:border-pink-400 flex items-center justify-center rounded-lg">
              <div className="relative w-full h-full flex justify-center items-center">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Password@12345"
                  className="w-full h-full rounded-md px-2 outline-none border-none caret-pink-600 bg-transparent shadow-md"
                  value={userDetails.confirmPassword}
                  onChange={handleInputChange}
                  autoComplete="off"
                />
                <div className="w-10 h-full flex justify-center items-center cursor-pointer hover:text-pink-700 text-lg">
                  <span
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    title={
                      showConfirmPassword ? "Hide Password" : "Show Password"
                    }
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                <label
                  htmlFor="confirmPassword"
                  className="absolute -top-[10px] left-3 text-xs text-[rgba(0,0,0,0.6)] px-3 bg-[#e9e6e6] border border-pink-400 rounded-full"
                >
                  Enter Confirm Password
                </label>
              </div>
            </div>
            <div
              className="w-full h-10 border-2 border-[#bcb9b9] flex items-center justify-center rounded-lg"
              style={RegisterBackgroundStyle}
            >
              <button
                type="submit"
                className="w-full h-full rounded-md px-3 outline-none border-none text-white font-bold text-lg hover:text-xl"
              >
                Register
              </button>
            </div>
            <div className="w-full flex justify-between px-2 text-slate-700">
              <p>
                Already have an account?{" "}
                <Link
                  to={"/login"}
                  className="cursor-pointer text-pink-600 hover:text-pink-700 hover:underline"
                >
                  Login
                </Link>
              </p>
            </div>
          </form>

          <div className="border-t border-b border-dashed border-black py-2">
            <div className="w-full px-10 text-center text-sm text-slate-500">
              <p>
                Registering for this site allows you to access your order status
                and history. Just fill in the above fields, and we'll get a new
                account set up for you in no time. We will only ask you for
                information necessary to make the purchase process faster and
                easier.
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
          <p className="w-full text-sm text-slate-500 text-center mt-1">
            By Signing up or logging in, you agree to our{" "}
            <span className="text-pink-600 cursor-pointer hover:text-pink-700 hover:underline">
              Terms and Conditions
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;

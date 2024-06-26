import React, { useEffect, useState } from "react";
import backgroundImage from "../../assets/navbarBackgroundImage.png";

// React Icons
import { FaMobileAlt } from "react-icons/fa";
import { PiMapPinPlusBold } from "react-icons/pi";
import { TbGiftCard } from "react-icons/tb";
import { LuBadgeHelp } from "react-icons/lu";
const TopNavbar = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [translated, setTranslated] = useState(false);
  const backgroundImageStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
  };

  const topNavLeftTextLinks = [
    "Use code: SUGAR15 to get 15% OFF on all orders!",
    "App Exclusive👉🏼use code: APP500 to get Rs.500 OFF! Only on App!",
    "NEW LAUNCH 😱: Colour Changing Lip Oil for Rs. 599 ",
    "SUGAR CREAMY LEMONADE for Rs. 599",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTranslated(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === topNavLeftTextLinks.length - 1 ? 0 : prevIndex + 1
        );
        setTranslated(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="w-full h-[36px]" style={backgroundImageStyle}>
      <div className="flex justify-center items-center w-full h-full">
        <div className="relative flex-1 w-full h-[25px] overflow-hidden flex items-center justify-self-start text-white">
          {topNavLeftTextLinks.map((link, index) => (
            <div
              key={index}
              className={`cursor-pointer ml-[120px] absolute transition-transform duration-500 ${
                index === currentIndex
                  ? "translate-y-0 opacity-100"
                  : translated
                  ? "translate-y-full opacity-0"
                  : "translate-y-0 opacity-0"
              }`}
              style={{ transition: "opacity 0.5s, transform 0.5s" }}
            >
              {link}
            </div>
          ))}
        </div>
        <div className="flex-1 w-full h-[25px]">
          <div className="flex justify-end items-center space-x-4 text-white h-full mr-[120px]">
            <div className="flex items-center gap-1 text-md font-semibold cursor-pointer hover:text-pink-600">
              <FaMobileAlt />
              <p>APP</p>
            </div>
            <div className="flex items-center gap-1 text-md font-semibold cursor-pointer hover:text-pink-600">
              <PiMapPinPlusBold />
              <p>STORE</p>
            </div>
            <div className="flex items-center gap-1 text-md font-semibold cursor-pointer hover:text-pink-600">
              <TbGiftCard />
              <p>GIFT CARD</p>
            </div>
            <div className="flex items-center gap-1 text-md font-semibold cursor-pointer hover:text-pink-600">
              <LuBadgeHelp />
              <p>HELP</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;

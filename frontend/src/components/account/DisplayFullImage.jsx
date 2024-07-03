import React from "react";

import { IoCloseCircleOutline } from "react-icons/io5";

const DisplayFullImage = ({ image, onClose }) => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-75 transition-all flex justify-center items-center z-50">
      <div className="relative w-full h-full bg-white flex justify-center items-center gap-4 shadow-lg rounded max-w-[80vh] max-h-[80vh]">
        <div className="flex justify-center items-center p-4 max-h-[80vh] max-w-[80vh]">
          <img
            src={image}
            alt="Img"
            className="w-full h-full max-h-[75vh] max-w-[75vh] object-contain rounded-md"
          />
        </div>
        <span
          onClick={onClose}
          className="absolute top-2 right-2 bg-gray-200 text-red-700 text-2xl rounded-full  p-2 transition-all hover:bg-red-700 hover:text-white cursor-pointer"
        >
          <IoCloseCircleOutline />
        </span>
      </div>
    </div>
  );
};

export default DisplayFullImage;

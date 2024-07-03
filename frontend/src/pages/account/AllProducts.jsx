import React from "react";
import { Link } from "react-router-dom";

const AllProducts = () => {
  return (
    <div className="w-full p-2">
      <div className="w-full px-4 py-2 bg-white flex justify-between items-center rounded shadow-sm">
        <h1 className="font-bold text-lg">All Products</h1>
        <Link
          to={"/account/upload-product"}
          className="border border-pink-600 bg-gray-100 text-pink-600 font-bold rounded-md px-3 py-1.5 hover:text-white hover:bg-pink-600 shadow-sm transition-all"
        >
          Upload Product
        </Link>
      </div>
      {/* Upload Product Component */}
      
    </div>
  );
};

export default AllProducts;

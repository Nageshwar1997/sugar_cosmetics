import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SummaryApi from "../../common";
import { toast } from "react-toastify";

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  const fetchAllProducts = async () => {
    try {
      const response = await fetch(SummaryApi.allProducts.url, {
        method: SummaryApi.allProducts.method,
      });
      const responseData = await response.json();

      console.log("Response Data", responseData.data);

      if (responseData.success) {
        setProducts(responseData.data);
      }
      if (responseData.error) {
        toast.error("Failed to fetch products");
      }

      // setProducts(responseData.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div className="w-full h-full bg-red-600 p-2 overflow-hidden">
      <div className="w-full px-2 py-2 bg-white flex justify-between items-center rounded shadow-sm">
        <h1 className="font-bold text-lg">All Products</h1>
        <Link
          to={"/account/upload-product"}
          className="border border-pink-600 bg-gray-100 text-pink-600 font-bold rounded-md px-3 py-1.5 hover:text-white hover:bg-pink-600 shadow-sm transition-all"
        >
          Upload Product
        </Link>
      </div>
      {/* Upload Product Component */}
      <div className="w-full h-full grid gap-2 grid-cols-4 p-2 mt-2 rounded bg-pink-500 overflow-y-scroll scrollbar-none">
        {products.map((product, index) => (
          <div
            key={product._id + index + "product"}
            className="max-w-[250px] min-h-[250px] p-2 bg-gray-100"
          >
            <div className="max-w-[50%] min-h-[50%] mx-auto">
              <img
                src={product?.productVariants[0]?.shadeImages[0]}
                alt={product?.productName}
                className="w-full h-full rounded-md object-scale-down object-center mix-blend-multiply"
              />
            </div>
            <div className="text-[#212121]">
              <h4 className="font-bold line-clamp-2">{product.productName}</h4>
              <div className="flex gap-1">
                <p>Price :</p>
                <div className="flex gap-5">
                  <p className="font-semibold">₹ {product?.price?.selling}</p>
                  <p className="font-semibold text-gray-500 line-through">₹ {product?.price?.original}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="max-w-[250px] min-h-[250px] bg-white">
          <h1>Product</h1>
        </div>
        <div className="max-w-[250px] min-h-[250px] bg-white">
          <h1>Product</h1>
        </div>
        <div className="max-w-[250px] min-h-[250px] bg-white">
          <h1>Product</h1>
        </div>
        <div className="max-w-[250px] min-h-[250px] bg-white">
          <h1>Product</h1>
        </div>
        <div className="max-w-[250px] min-h-[250px] bg-white">
          <h1>Product</h1>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;

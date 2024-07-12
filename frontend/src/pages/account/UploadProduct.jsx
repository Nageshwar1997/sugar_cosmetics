import React, { useState } from "react";
import categories from "../../helpers/categories";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete, MdEdit, MdOutlineDelete } from "react-icons/md";
import uploadImageCloudinary from "../../helpers/uploadImageCloudinary";
import DisplayFullImage from "../../components/account/DisplayFullImage";
import SummaryApi from "../../common";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const UploadProduct = () => {
  const [product, setProduct] = useState({
    productName: "",
    category: "",
    subCategory: "",
    subCategoryLabel: "",
    productVariants: [],
    offers: "",
    description: "",
    ingredients: "",
    howToUse: "",
    additionalDetails: "",
    price: { original: "", selling: "" },
    rating: { rate: "", reviews: "" },
  });

  const [shade, setShade] = useState({
    stock: "5",
    hexColorCode: "",
    colorName: "",
    shadeImages: [],
  });

  const [editingIndex, setEditingIndex] = useState(null);
  const [showFullImage, setShowFullImage] = useState(false);
  const [fullImage, setFullImage] = useState("");

  const navigate = useNavigate();

  const handleProductInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      price: {
        ...prevProduct.price,
        [name]: value,
      },
    }));
  };

  const handleRatingChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      rating: {
        ...prevProduct.rating,
        [name]: value,
      },
    }));
  };

  const handleShadeChange = async (e) => {
    const { files, type, name, value } = e.target;

    if (type === "file" && files.length > 0) {
      const imageFile = files[0];
      try {
        const cloudinaryImageUrl = await uploadImageCloudinary(imageFile);

        if (cloudinaryImageUrl.url) {
          setShade((prevShade) => ({
            ...prevShade,
            shadeImages: [...prevShade.shadeImages, cloudinaryImageUrl.url],
          }));
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        // Handle error as needed
      }
    } else if (type === "text" || type === "color") {
      setShade((prevShade) => ({
        ...prevShade,
        [name]: value,
      }));
    }
  };

  const handleShadeUpload = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      // Editing existing variant
      setProduct((prevProduct) => {
        const updatedVariants = [...prevProduct.productVariants];
        updatedVariants[editingIndex] = shade;
        return { ...prevProduct, productVariants: updatedVariants };
      });
      setEditingIndex(null); // Reset editing state
    } else {
      // Adding new variant
      setProduct((prevProduct) => ({
        ...prevProduct,
        productVariants: [...prevProduct.productVariants, shade],
      }));
    }
    setShade({
      stock: "",
      hexColorCode: "#000000",
      colorName: "",
      shadeImages: [],
    });
  };

  const handleImageDelete = (imageIndex) => {
    setShade((prevShade) => ({
      ...prevShade,
      shadeImages: prevShade.shadeImages.filter(
        (_, index) => index !== imageIndex
      ),
    }));
  };

  const handleVariantEdit = (index) => {
    const variantToEdit = product.productVariants[index];
    setShade(variantToEdit);
    setEditingIndex(index); // To track the index of the variant being edited
  };

  const handleVariantDelete = (index) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      productVariants: prevProduct.productVariants.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const handleUploadProduct = async (e) => {
    e.preventDefault();

    const response = await fetch(SummaryApi.uploadProduct.url, {
      method: SummaryApi.uploadProduct.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    const responseData = await response.json();

    if (responseData.success) {
      toast.success(responseData.message);
      console.log("Response Data", responseData);

      navigate("./products")
    }
    if (responseData.error) {
      toast.error(responseData.message);
      throw new Error(responseData.error);
    }
  };

  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex justify-center gap-3 bg-white rounded-md">
        {/* Form Left */}
        <div className="py-1 px-2 w-full h-full flex flex-col gap-2">
          <form
            onSubmit={handleUploadProduct}
            className="w-full mb-2 h-auto flex flex-col gap-2 overflow-y-scroll scrollbar-none"
          >
            {/* Product Name */}
            <div className="grid gap-1 w-full">
              <label
                htmlFor="productName"
                className="font-semibold cursor-pointer w-fit"
              >
                Product Name :
              </label>
              <input
                type="text"
                id="productName"
                name="productName"
                value={product?.productName}
                onChange={handleProductInputChange}
                placeholder=" Enter Product Name"
                className="w-full p-2 border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus-within:border-pink-600"
              />
            </div>
            {/* Product Category */}
            <div className="grid gap-1 w-full">
              <label
                htmlFor="category"
                className="font-semibold cursor-pointer w-fit"
              >
                Product Category :
              </label>
              <select
                name="category"
                id="category"
                value={product?.category}
                onChange={handleProductInputChange}
                className="w-full capitalize p-2 border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus-within:border-pink-600"
              >
                <option value="">Select Category</option>
                {categories.map((category, index) => (
                  <option key={category.id + index} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Product Sub Category */}
            <div className="grid gap-1 w-full">
              <label
                htmlFor="subCategory"
                className="font-semibold cursor-pointer w-fit"
              >
                Product Sub Category :
              </label>
              <input
                type="text"
                id="subCategory"
                name="subCategory"
                value={product?.subCategory}
                onChange={handleProductInputChange}
                placeholder=" Enter Sub Category"
                className="w-full p-2 border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus-within:border-pink-600"
              />
            </div>
            {/* Product Sub Category Label */}
            <div className="grid gap-1 w-full">
              <label
                htmlFor="subCategoryLabel"
                className="font-semibold cursor-pointer w-fit"
              >
                Product Sub Category Label :
              </label>
              <input
                type="text"
                id="subCategoryLabel"
                name="subCategoryLabel"
                value={product?.subCategoryLabel}
                onChange={handleProductInputChange}
                placeholder=" Enter Sub Category Label"
                className="w-full p-2 border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus-within:border-pink-600"
              />
            </div>

            {/* Product Price */}
            <div className="flex gap-3">
              {/* Original Price */}
              <div className="grid gap-1 w-full">
                <label
                  htmlFor="original"
                  className="font-semibold cursor-pointer w-fit"
                >
                  Original Price :
                </label>
                <input
                  type="text"
                  id="original"
                  name="original"
                  value={product?.price?.original}
                  onChange={handlePriceChange}
                  placeholder=" Enter Original Price"
                  className="w-full p-2 border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus-within:border-pink-600"
                />
              </div>
              {/* Selling Price */}
              <div className="grid gap-1 w-full">
                <label
                  htmlFor="selling"
                  className="font-semibold cursor-pointer w-fit"
                >
                  Selling Price :
                </label>
                <input
                  type="text"
                  id="selling"
                  name="selling"
                  value={product?.price?.selling}
                  onChange={handlePriceChange}
                  placeholder=" Enter Selling Price"
                  className="w-full p-2 border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus-within:border-pink-600"
                />
              </div>
            </div>
            {/* Product Rating */}
            <div className="flex gap-3">
              <div className="grid gap-1 w-full">
                <label
                  htmlFor="rate"
                  className="font-semibold cursor-pointer w-fit"
                >
                  Rating :
                </label>
                <input
                  type="text"
                  id="rate"
                  name="rate"
                  value={product?.rating?.rate}
                  onChange={handleRatingChange}
                  placeholder=" Enter Rating"
                  className="w-full p-2 border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus-within:border-pink-600"
                />
              </div>
              {/* Reviews */}
              <div className="grid gap-1 w-full">
                <label
                  htmlFor="reviews"
                  className="font-semibold cursor-pointer w-fit"
                >
                  Reviews :
                </label>
                <input
                  type="text"
                  id="reviews"
                  name="reviews"
                  value={product?.rating?.reviews}
                  onChange={handleRatingChange}
                  placeholder=" Enter Reviews"
                  className="w-full p-2 border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus-within:border-pink-600"
                />
              </div>
            </div>
            {/* Product Offers */}
            <div className="grid gap-1 w-full">
              <label
                htmlFor="offers"
                className="font-semibold cursor-pointer w-fit"
              >
                Product Offers :
              </label>
              <textarea
                name="offers"
                id="offers"
                value={product?.offers}
                onChange={handleProductInputChange}
                rows="5"
                placeholder=" Enter Product Description"
                className="w-full text-sm p-2 border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus-within:border-pink-600 resize-none scrollbar-none"
              />
            </div>
            {/* Product Description */}
            <div className="grid gap-1 w-full">
              <label
                htmlFor="description"
                className="font-semibold cursor-pointer w-fit"
              >
                Product Description :
              </label>
              <textarea
                name="description"
                id="description"
                value={product?.description}
                onChange={handleProductInputChange}
                rows="5"
                placeholder=" Enter Product Description"
                className="w-full text-sm p-2 border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus-within:border-pink-600 resize-none scrollbar-none"
              />
            </div>
            {/* Product Ingredients */}
            <div className="grid gap-1 w-full">
              <label
                htmlFor="ingredients"
                className="font-semibold cursor-pointer w-fit"
              >
                Product Ingredients :
              </label>
              <textarea
                name="ingredients"
                id="ingredients"
                value={product?.ingredients}
                onChange={handleProductInputChange}
                rows="5"
                placeholder=" Enter Product Ingredients"
                className="w-full text-sm p-2 border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus-within:border-pink-600 resize-none scrollbar-none"
              />
            </div>
            {/* Product How to Use */}
            <div className="grid gap-1 w-full">
              <label
                htmlFor="howToUse"
                className="font-semibold cursor-pointer w-fit"
              >
                How to Use :
              </label>
              <textarea
                name="howToUse"
                id="howToUse"
                value={product?.howToUse}
                onChange={handleProductInputChange}
                rows="5"
                placeholder=" Enter How to Use Instructions"
                className="w-full text-sm p-2 border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus-within:border-pink-600 resize-none scrollbar-none"
              />
            </div>
            {/* Additional Details */}
            <div className="grid gap-1 w-full">
              <label
                htmlFor="additionalDetails"
                className="font-semibold cursor-pointer w-fit"
              >
                Additional Details :
              </label>
              <textarea
                name="additionalDetails"
                id="additionalDetails"
                value={product?.additionalDetails}
                onChange={handleProductInputChange}
                rows="5"
                placeholder=" Enter Additional Details"
                className="w-full text-sm p-2 border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus-within:border-pink-600 resize-none scrollbar-none"
              />
            </div>
            {product.productVariants.length === 0 && (
              <p className="text-red-500">Please add at least one variant</p>
            )}
            <button
              type="submit"
              className="w-full bg-pink-500 text-white py-2 rounded-md mt-2"
              disabled={product.productVariants.length === 0}
            >
              Upload Product
            </button>
          </form>
        </div>
        {/* Form Right */}
        <div className="py-1 px-2 w-full h-full flex flex-col gap-2 overflow-y-scroll scrollbar-none">
          <div className="w-full h-auto flex flex-col gap-2">
            <form
              onSubmit={handleShadeUpload}
              className="w-full h-auto flex flex-col gap-2"
            >
              {/* Shade Stock */}
              <div className="grid gap-1 w-full">
                <label
                  htmlFor="stock"
                  className="font-semibold cursor-pointer w-fit"
                >
                  Shade Stock :
                </label>
                <input
                  type="text"
                  id="stock"
                  name="stock"
                  value={shade?.stock}
                  onChange={handleShadeChange}
                  placeholder=" Enter Shade Stock"
                  className="w-full p-2 border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus-within:border-pink-600"
                />
              </div>
              {/* Shade Color */}
              <div className="grid gap-1 w-full">
                <label
                  htmlFor="colorName"
                  className="font-semibold cursor-pointer w-fit"
                >
                  Shade Color Name :
                </label>
                <input
                  type="text"
                  id="colorName"
                  name="colorName"
                  value={shade?.colorName}
                  onChange={handleShadeChange}
                  placeholder=" Enter Shade Color"
                  className="w-full p-2 border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus-within:border-pink-600"
                />
              </div>
              {/* Shade Hex Color */}
              <div className="flex w-full">
                {/* Shade Hex Color Code Using Color Picker */}
                <div className="grid gap-1 w-full">
                  <label
                    htmlFor="hexColorCode"
                    className="font-semibold cursor-pointer w-fit"
                  >
                    Shade Hex Color Code :
                  </label>
                  <input
                    type="color"
                    id="hexColorCode"
                    name="hexColorCode"
                    value={shade?.hexColorCode}
                    onChange={handleShadeChange}
                    className="w-full h-14 p-1 border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus-within:border-pink-600"
                  />
                </div>
                {/* Shade Hex Color Code Using Input */}
                <div className="grid gap-1 w-full">
                  <label
                    htmlFor="colorName"
                    className="font-semibold cursor-pointer w-fit"
                  >
                    HEX Color Code :
                  </label>
                  <input
                    type="text"
                    id="hexColorCode"
                    name="hexColorCode"
                    value={shade?.hexColorCode}
                    onChange={handleShadeChange}
                    placeholder=" Enter Hex Color Code"
                    className="w-full h-14 p-1 border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus-within:border-pink-600"
                  />
                </div>
              </div>

              {/* Shade Images */}
              <div className="grid gap-1 w-full">
                <label
                  htmlFor="shadeImages"
                  className="font-semibold cursor-pointer w-fit"
                >
                  Shade Images :
                </label>
                <div className="flex flex-wrap gap-2">
                  <label
                    htmlFor="shadeImagesInput"
                    className="w-20 h-20 bg-gray-200 rounded-md flex items-center justify-center cursor-pointer"
                  >
                    <div className="flex flex-col items-center">
                      <FaCloudUploadAlt size={24} />
                      <p className="text-xs text-wrap">Select Images</p>
                    </div>
                    <input
                      type="file"
                      id="shadeImagesInput"
                      name="shadeImages"
                      onChange={handleShadeChange}
                      className="hidden"
                    />
                  </label>
                  {shade.shadeImages.map((img, index) => (
                    <div key={index} className="relative">
                      <div className="w-20 h-20 p-1 bg-gray-100 rounded-md">
                        <img
                          src={img}
                          alt="Shade"
                          className="w-full h-full object-cover hover:object-scale-down transition-all mix-blend-multiply rounded-md cursor-pointer"
                          onClick={() => {
                            setShowFullImage(true);
                            setFullImage(img);
                          }}
                        />
                      </div>
                      <button
                        type="button"
                        className="absolute top-0 right-0 hover:bg-red-600 hover:text-white transition-all rounded-full p-1"
                        onClick={() => handleImageDelete(index)}
                      >
                        <MdDelete size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md mt-2"
              >
                {editingIndex !== null ? "Update Shade" : "Add Shade"}
              </button>
            </form>
          </div>
          <div className="w-full h-auto flex flex-col gap-2">
            {product?.productVariants.map((variant, index) => (
              <div
                key={index}
                className="flex justify-between items-center border border-gray-300 p-2 rounded-md"
              >
                <div className="flex gap-2">
                  <div className="w-16 h-16">
                    {variant.shadeImages.length > 0 ? (
                      <img
                        src={variant.shadeImages[0]}
                        alt={variant.colorName}
                        className="w-full h-full object-cover rounded-md"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 rounded-md" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm line-clamp-1">
                      {" "}
                      Color Name :
                      <span className="capitalize font-semibold">
                        {" "}
                        {variant.colorName}
                      </span>
                    </p>
                    <p className="text-sm">
                      HEX :
                      <span className="font-semibold">
                        {" "}
                        {variant.hexColorCode}
                      </span>
                    </p>
                    <p className="text-sm">
                      In Stock :
                      <span className="font-semibold"> {variant.stock}</span>
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="bg-yellow-400 text-white p-1 text-xl rounded-full"
                    onClick={() => handleVariantEdit(index)}
                  >
                    <MdEdit />
                  </button>
                  <button
                    type="button"
                    className="bg-red-500 text-white p-1 text-xl rounded-full"
                    onClick={() => handleVariantDelete(index)}
                  >
                    <MdOutlineDelete />
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* Display Full Image */}
          {showFullImage && (
            <DisplayFullImage
              onClose={() => setShowFullImage(false)}
              image={fullImage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadProduct;

const cloudinaryURL = process.env.REACT_APP_CLOUDINARY_URL;

const uploadImageCloudinary = async (image) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "sugarCosmetics");

  const response = await fetch(cloudinaryURL, {
    method: "POST",
    body: formData,
  });

  const responseData = await response.json();
  return responseData;
};

export default uploadImageCloudinary;

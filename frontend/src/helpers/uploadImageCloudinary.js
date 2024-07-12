const cloudinaryURL = process.env.REACT_APP_CLOUDINARY_URL;

const uploadImageCloudinary = async (image) => {
  
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "sugarCosmetics");
  try {
    const response = await fetch(cloudinaryURL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Image upload failed");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw error; // Re-throw the error for handling in the calling function
  }
};

export default uploadImageCloudinary;

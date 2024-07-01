const imageToBase64 = async (image) => {
  const reader = new FileReader();
  reader.readAsDataURL(image);

  const imageData = new Promise((resolve, reject) => {
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });

  return imageData;
};

export default imageToBase64;

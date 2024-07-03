const userModel = require("../models/userModel");

const uploadProductPermission = async (userId) => {
  const user = await userModel.findById(userId);
  if (user.role === "ADMIN" || user.role === "MASTER") {
    return true;
  }
  return false;
};
module.exports = uploadProductPermission;

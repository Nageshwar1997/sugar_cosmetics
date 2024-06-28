const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");

async function userRegisterController(req, res) {
  try {
    const { email, phone, password, firstName, lastName } = req.body;

    // Validate input fields
    if (!email) {
      return res.status(400).json({
        message: "Please Provide Valid Email",
        error: true,
        success: false,
      });
    }
    if (!phone) {
      return res.status(400).json({
        message: "Please Provide Valid Phone Number",
        error: true,
        success: false,
      });
    }
    if (!password) {
      return res.status(400).json({
        message: "Please Provide Valid Password",
        error: true,
        success: false,
      });
    }
    if (!firstName) {
      return res.status(400).json({
        message: "Please Provide Valid First Name",
        error: true,
        success: false,
      });
    }
    if (!lastName) {
      return res.status(400).json({
        message: "Please Provide Valid Last Name",
        error: true,
        success: false,
      });
    }

    // Check if user already exists
    const user = await userModel.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists", error: true, success: false });
    }

    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(password, salt);
    if (!hashPassword) {
      return res.status(500).json({
        message: "Something went wrong while hashing password",
        error: true,
        success: false,
      });
    }

    // Create new user payload
    const payload = {
      ...req.body,
      role: "USER",
      firstName,
      lastName,
      email,
      phone,
      password: hashPassword,
    };

    // Save new user to the database
    const userData = new userModel(payload);
    const saveUser = await userData.save();

    console.log("Save User", saveUser);

    // Respond with success
    res.status(201).json({
      data: saveUser,
      success: true,
      error: false,
      message: "User Registered Successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || "Internal Server Error" || error,
      error: true,
      success: false,
    });
  }
}

module.exports = userRegisterController;

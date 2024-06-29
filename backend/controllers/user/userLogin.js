const bcrypt = require("bcryptjs");
const userModel = require("../../models/userModel");
const jwt = require("jsonwebtoken");

async function userLoginController(req, res) {
  try {
    // Request body se email, phone aur password ko destructure karte hain
    const { email, phone, password } = req.body;

    // Email aur phone dono na ho to error throw karenge
    if (!email && !phone) {
      return res.status(400).json({
        message: "Please provide a valid Email or Phone Number",
        error: true,
        success: false,
      });
    }

    // Password na ho to error throw karenge
    if (!password) {
      return res.status(400).json({
        message: "Please provide a valid Password",
        error: true,
        success: false,
      });
    }

    // User ko find karne ki koshish karte hain email ya phone se
    const user = await userModel.findOne(email ? { email } : { phone });

    // Agar user na mile to error throw karenge
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    // Password check karte hain bcrypt se
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // Agar password sahi na ho to error throw karenge
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Incorrect password, please check your password",
        error: true,
        success: false,
      });
    }

    // JWT token data prepare karte hain
    const tokenData = {
      _id: user._id,
      [email ? "email" : "phone"]: email ? user.email : user.phone,
    };

    // Token generate karte hain JWT se
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
      expiresIn: "30d", // Token expiration time
    });

    // Token options set karte hain cookie ke liye
    const tokenOptions = {
      httpOnly: true,
      secure: process.env.PRODUCTION_NODE_ENV === "production" || true, // Secure only in production
      sameSite: "none",
    };

    // Response with token and user data
    res.cookie("token", token, tokenOptions).status(200).json({
      message: "Login successfully!",
      data: { token, user },
      success: true,
      error: false,
    });
  } catch (error) {
    // Catch block for error handling
    res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
}

module.exports = userLoginController;

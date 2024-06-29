const bcrypt = require("bcryptjs");
const userModel = require("../../models/userModel");
const jwt = require("jsonwebtoken");

async function userLoginController(req, res) {
  try {
    const { email, phone, password } = req.body;

    if (!email && !phone) {
      throw new Error("Please Provide Valid Email/Phone Number");
    }
    if (!password) {
      throw new Error("Please Provide Valid Password");
    }

    const user = await userModel.findOne(email ? { email } : { phone });

    if (!user) {
      throw new Error("User Not Found...!");
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    console.log("Check Password", checkPassword);
    if (checkPassword) {
      const tokenData = {
        _id: user._id,
        [email ? "email" : "phone"]: email ? user.email : user.phone,
      };
      const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
        expiresIn: 60 * 60 * 24 * 30,
      });

      console.log("Token", token);

      const tokenOption = {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      };
      res.cookie("token", token, tokenOption).status(200).json({
        message: "Login Successfully...!",
        data: { token, user },
        success: true,
        error: false,
      });
    } else {
      throw new Error("Wrong password please check your password...!");
    }
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

module.exports = userLoginController;

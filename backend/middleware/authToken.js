const jwt = require("jsonwebtoken");

async function authToken(req, res, next) {
  try {
    // Token ko cookies ya headers se nikalte hain
    const token =
      req.cookies?.token || req.headers?.authorization?.split(" ")[1];

    // console.log("Token : ", token);

    // Agar token nahi milta, to response bhejte hain ke login karein
    if (!token) {
      return res.status(401).json({
        message: "Please login first",
        error: true,
        success: false,
      });
    }

    // Token ko verify karte hain
    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (error, decoded) => {
      // Agar verification mein error aati hai, to console mein print karte hain

      // console.log("Error:", error);
      // console.log("Decoded:", decoded);
      if (error) {
        console.log("Auth error:", error);
        return res.status(403).json({
          message: "Invalid or expired token",
          error: true,
          success: false,
        });
      }

      // Agar token valid hai, to decoded userId ko request object mein add karte hain
      req.userId = decoded._id;

      // next() function ko call karte hain taaki next middleware ya route handler execute ho sake
      next();
    });
  } catch (error) {
    // Agar koi bhi error aati hai, to response bhejte hain ke kuch galat ho gaya
    res.status(400).json({
      message: error.message || "Something went wrong",
      error: true,
      success: false,
    });
  }
}

module.exports = authToken;

const jwt = require("jsonwebtoken");

async function authToken(req, res, next) {
  try {
    // Token ko cookies ya headers se nikalte hain
    const token =
      req.cookies?.token || req.headers;

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
      if (error) {
        if (error.name === "TokenExpiredError") {
          // Token expired error handling
          return res.status(403).json({
            message: "Token expired. Please login again.",
            error: true,
            success: false,
          });
        } else {
          // Other JWT verification errors
          console.error("JWT verification error:", error);
          return res.status(403).json({
            message: "Invalid token",
            error: true,
            success: false,
          });
        }
      }

      // Valid token case
      req.userId = decoded._id;
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

// const jwt = require("jsonwebtoken");

// async function authToken(req, res, next) {
//   try {
//     // Token ko cookies ya headers se nikalte hain
//     const token =
//       req.cookies?.token || req.headers?.authorization?.split(" ")[1];

//     // console.log("Token : ", token);

//     // Agar token nahi milta, to response bhejte hain ke login karein
//     if (!token) {
//       return res.status(401).json({
//         message: "Please login first",
//         error: true,
//         success: false,
//       });
//     }

//     // Token ko verify karte hain
//     jwt.verify(token, process.env.TOKEN_SECRET_KEY, (error, decoded) => {
//       if (error) {
//         if (error.name === "TokenExpiredError") {
//           // Token expired error handling
//           return res.status(403).json({
//             message: "Token expired. Please login again.",
//             error: true,
//             success: false,
//           });
//         } else {
//           // Other JWT verification errors
//           console.error("JWT verification error:", error);
//           return res.status(403).json({
//             message: "Invalid token",
//             error: true,
//             success: false,
//           });
//         }
//       }

//       // Valid token case
//       req.userId = decoded._id;
//       next();
//     });

//   } catch (error) {
//     // Agar koi bhi error aati hai, to response bhejte hain ke kuch galat ho gaya
//     res.status(400).json({
//       message: error.message || "Something went wrong",
//       error: true,
//       success: false,
//     });
//   }
// }

// module.exports = authToken;

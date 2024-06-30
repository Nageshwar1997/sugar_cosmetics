const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    phone: {
      type: Number,
      unique: true,
      required: [true, "Phone number is required"],
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v); // Validates 10-digit phone number
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    profilePic: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN", "MASTER"],
      default: "USER",
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;

// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema(
//   {
//     firstName: String,
//     lastName: String,
//     email: {
//       type: String,
//       unique: true,
//       required: true,
//     },
//     phone: {
//       type: Number,
//       unique: true,
//       required: true,
//     },
//     password: String,
//     profilePic: String,
//     role: String,
//   },
//   {
//     timestamps: true,
//   }
// );

// const userModel = mongoose.model("user", userSchema);

// module.exports = userModel;

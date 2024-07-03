const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    subCategory: {
      type: String,
      trim: true,
    },
    subCategoryLabel: {
      type: String,
      trim: true,
    },
    productVariants: [
      {
        stock: {
          type: Number,
        },
        hexColorCode: {
          type: String,
          default: "#000000",
          validate: {
            validator: function (v) {
              return /^#[0-9A-Fa-f]{6}$/.test(v);
            },
            message: (props) => `${props.value} is not a valid hex color code!`,
          },
        },
        colorName: {
          type: String,
          trim: true,
        },
        shadeImages: [
          {
            type: String,
            required: true,
            trim: true,
          },
        ],
      },
    ],
    offers: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    ingredients: {
      type: String,
      trim: true,
    },
    howToUse: {
      type: String,
      trim: true,
    },
    additionalDetails: {
      type: String,
      trim: true,
    },
    price: { original: Number, selling: Number },
    rating: {
      rate: {
        type: Number,
        min: 0,
        max: 5,
      },
      reviews: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;

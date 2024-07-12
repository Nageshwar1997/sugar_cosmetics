const express = require("express");
const router = express.Router();

// User Controllers
const userRegisterController = require("../controllers/user/userRegister");
const userLoginController = require("../controllers/user/userLogin");
const userDetailsController = require("../controllers/user/userDetails");
const userLogoutController = require("../controllers/user/userLogout");
const allUsersController = require("../controllers/masterAndAdmin/allUsers");
const updateUserController = require("../controllers/masterAndAdmin/updateUser");
const addToCartController = require("../controllers/user/addToCart");
const countAddToCartController = require("../controllers/user/countAddToCart");
const addToCartViewController = require("../controllers/user/addToCartView");

// // Product Controllers
const uploadProductController = require("../controllers/masterAndAdmin/uploadProduct");
const getProductController = require("../controllers/product/getProduct");
const updateProductController = require("../controllers/product/updateProduct");
const getCategoryProductController = require("../controllers/product/getCategoryProductOne");
const getCategoryWiseProductController = require("../controllers/product/getCategoryWiseProduct");
const getProductDetailsController = require("../controllers/product/getProductDetails");

// Middleware
const authToken = require("../middleware/authToken");
const updateAddToCartCountController = require("../controllers/user/updateCountAddToCart");
const deleteProductFromCartController = require("../controllers/user/deleteFromCart");
const searchProductController = require("../controllers/product/searchProduct");
const filterProductController = require("../controllers/product/filterProduct");
const paymentController = require("../controllers/order/paymentController");
const webHookController = require("../controllers/order/webhook");
const orderController = require("../controllers/order/order.controller");
const allOrdersController = require("../controllers/order/allOrders.controller");


// Done

// User Routes
router.post("/register", userRegisterController);
router.post("/login", userLoginController);
router.get("/user-details", authToken, userDetailsController);
router.get("/logout", authToken, userLogoutController);

// Master Admin Routes
router.get("/all-users", authToken, allUsersController);
router.post("/update-user", authToken, updateUserController);

// Master Admin Routes ---> Product
router.post("/upload-product", authToken, uploadProductController);

// Product
router.get("/get-products", getProductController);

// Remaining
router.get("/all-orders", authToken, allOrdersController);

// Product
router.post("/update-product", authToken, updateProductController);
router.get("/get-categoryProduct", getCategoryProductController);
router.post("/category-product", getCategoryWiseProductController);
router.post("/product-details", getProductDetailsController);
router.get("/search", searchProductController);
router.post("/filter-product", filterProductController);

// User Add To Cart
router.post("/add-to-cart", authToken, addToCartController);
router.get("/count-add-to-cart", authToken, countAddToCartController);
router.get("/user-cart", authToken, addToCartViewController);
router.post(
  "/update-count-add-to-cart",
  authToken,
  updateAddToCartCountController
);
router.post("/delete-cart-product", authToken, deleteProductFromCartController);

// Payment & Order Routes
router.post("/payment", authToken, paymentController);
router.post("/webhook", webHookController); // backendUrl/api/webhook
router.get("/order-list", authToken, orderController);



module.exports = router;

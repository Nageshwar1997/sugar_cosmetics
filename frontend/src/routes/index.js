import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import Account from "../pages/account/Account";
import AllProducts from "../pages/account/AllProducts";
import AllUsers from "../pages/account/AllUsers";
import AuthLayout from "../components/layouts/AuthLayout";
import UploadProduct from "../pages/account/UploadProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <AuthLayout />,
        children: [
          {
            path: "register",
            element: <Register />,
          },
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "forgot-password",
            element: <ForgotPassword />,
          },
        ],
      },
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/account",
        element: <Account />,
        children: [
          {
            path: "products",
            element: <AllProducts />,
          },
          {
            path: "upload-product",
            element: <UploadProduct />,
          },
          {
            path: "users",
            element: <AllUsers />,
          },
        ],
      },
    ],
  },
]);

export default router;

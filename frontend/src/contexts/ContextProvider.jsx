import React, { useEffect } from "react";
import SummaryApi from "../common";
import Context from ".";
import { useDispatch } from "react-redux";
import { setUserDetails, clearUserDetails } from "../store/userSlice";

const ContextProvider = ({ children }) => {
  const dispatch = useDispatch();

  const fetchCurrentUserDetails = async () => {
    try {
      const response = await fetch(SummaryApi.currentUserDetails.url, {
        method: SummaryApi.currentUserDetails.method,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }

      const responseData = await response.json();

      if (responseData.success) {
        dispatch(setUserDetails(responseData.data));
      } else {
        throw new Error(responseData.message || "Failed to fetch user details");
      }
    } catch (error) {
      console.error("Error fetching user details:", error.message);
      dispatch(clearUserDetails()); // Clear user details on error
    }
  };

  const isTokenValid = () => {
    const token = sessionStorage.getItem("token");
    const tokenExpiry = sessionStorage.getItem("tokenExpiry");

    if (!token || !tokenExpiry) return false;

    if (new Date(tokenExpiry) <= new Date()) {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("tokenExpiry");
      dispatch(clearUserDetails());
      return false;
    }

    return true;
  };

  useEffect(() => {
    if (isTokenValid()) {
      fetchCurrentUserDetails();
    }
  }, []);

  return (
    <Context.Provider
      value={{
        fetchCurrentUserDetails,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;

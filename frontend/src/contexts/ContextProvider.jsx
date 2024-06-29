import React, { useEffect } from "react";
import SummaryApi from "../common";
import Context from ".";

const ContextProvider = ({ children }) => {
  const fetchCurrentUserDetails = async () => {
    try {
      const response = await fetch(SummaryApi.currentUserDetails.url, {
        method: SummaryApi.currentUserDetails.method,
        credentials: "include",
      });

      const responseData = await response.json();

      console.log("Current User Details : ", responseData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // User Details
    fetchCurrentUserDetails();
  }, []);
  return (
    <Context.Provider
      value={{
        fetchCurrentUserDetails, // function to fetch the user details from the backend
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import SummaryApi from "../common";
import Context from ".";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSlice";

const ContextProvider = ({ children }) => {
  const dispatch = useDispatch();

  const fetchCurrentUserDetails = async () => {
    const response = await fetch(SummaryApi.currentUserDetails.url, {
      method: SummaryApi.currentUserDetails.method,
      credentials: "include",
    });

    const responseData = await response.json();

    if (responseData.success) {
      dispatch(setUserDetails(responseData.data));
    }
  };

  useEffect(() => {
    fetchCurrentUserDetails();
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

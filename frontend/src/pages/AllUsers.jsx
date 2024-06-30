import React, { useEffect, useState } from "react";
import SummaryApi from "../common";

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);

  const fetchAllUsers = async () => {
    const response = await fetch(SummaryApi.allUsers.url, {
      method: SummaryApi.allUsers.method,
      credentials: "include",
    });
    const responseData = await response.json();

    console.log("Response Data", responseData);
  };
  useEffect(() => {
    fetchAllUsers();
  });
  return <div>AllUsers</div>;
};

export default AllUsers;

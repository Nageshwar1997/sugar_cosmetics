import React, { useEffect, useState } from "react";
import SummaryApi from "../../common";
import { toast } from "react-toastify";
import { FaRegUserCircle } from "react-icons/fa";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllUsers = async () => {
    try {
      const response = await fetch(SummaryApi.allUsers.url, {
        method: SummaryApi.allUsers.method,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();

      if (responseData.success) {
        setUsers(responseData.data);
        console.log(responseData.data);
      } else {
        throw new Error(responseData.message || "Failed to fetch users");
      }

      setLoading(false);
    } catch (error) {
      toast.error(error.message || "Failed to fetch users");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div
      className="w-full h-full p-2 bg-white rounded-xl overflow-y-scroll scrollbar-none"
      style={{ boxShadow: "0 2px 10px hsla(0, 0%, 51%, .1)" }}
    >
      <div className="bg-white w-full h-full grid grid-cols-4 gap-6 p-2 rounded-xl">
        {users.length > 0 ? (
          users.map((user) => (
            <div
              key={user._id}
              className="w-full h-[251px] border border-gray-300 rounded-md bg-gray-100 p-2 shadow-md"
            >
              <div className="w-[120px] h-[120px] mx-auto p-2">
                {user?.profilePic ? (
                  <img
                    src={user?.profilePic}
                    alt={user?.firstName}
                    className="w-full mx-auto h-full rounded-xl shadow-md"
                  />
                ) : (
                  <div className="w-full mx-auto h-full rounded-xl text-8xl flex items-center justify-center text-gray-500">
                    <FaRegUserCircle />
                  </div>
                )}
              </div>
              <div className="w-full text-xl p-2">
                <p className="text-center uppercase">{user?.role}</p>
                <p className="font-bold capitalize line-clamp-1">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="line-clamp-1 text-sm">Email: {user?.email}</p>
                {user?.phone && <p className="line-clamp-1 text-sm">Phone: +91 {user?.phone}</p>}
              </div>
            </div>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
};

export default AllUsers;

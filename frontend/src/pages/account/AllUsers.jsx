import React, { useEffect, useState } from "react";
import SummaryApi from "../../common";
import { toast } from "react-toastify";
import { FaRegUserCircle, FaSave, FaUserEdit } from "react-icons/fa";
import moment from "moment";
import ROLE from "../../common/role";
import { useSelector } from "react-redux";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({});

  const currentUser = useSelector((state) => state?.user?.user);

  const handleSave = async () => {
    try {
      const response = await fetch(SummaryApi.updateUser.url, {
        method: SummaryApi.updateUser.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      const responseData = await response.json();

      if (responseData.success) {
        toast.success("User updated successfully");
        const updatedUsers = users.map((user) =>
          user._id === updatedUser.userId ? responseData.data : user
        );
        setUsers(updatedUsers);
        fetchAllUsers();
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      console.log(error || "Failed to update user");
    }
    setEdit(null);
  };

  const handleEdit = (userId) => {
    setEdit(userId);
    const user = users.find((user) => user._id === userId);
    setUpdatedUser({ userId, role: user.role });
  };

  const handleChangeUserRole = (e, userId) => {
    const updatedUsers = users.map((user) => {
      if (user._id === userId) {
        return { ...user, role: e.target.value };
      }
      return user;
    });
    setUsers(updatedUsers);
    setUpdatedUser({ userId, role: e.target.value });
  };

  const fetchAllUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.allUsers.url, {
        method: SummaryApi.allUsers.method,
        credentials: "include",
      });

      const responseData = await response.json();

      if (responseData.success) {
        setLoading(false);
        setUsers(responseData.data);
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error(error.message || "Failed to fetch users");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  console.log("Updated User", updatedUser);

  return (
    <div
      className="w-full h-full p-2 bg-white rounded-xl overflow-y-scroll scrollbar-none"
      style={{ boxShadow: "0 2px 10px hsla(0, 0%, 51%, .1)" }}
    >
      <div className="bg-white w-full h-full grid grid-cols-4 gap-6 p-2 rounded-xl">
        {!loading && users.length > 0 ? (
          users.map((user) => (
            <div
              key={user._id}
              className="relative w-full h-[265px] border border-gray-300 rounded-md bg-gray-100 p-2 shadow-md"
            >
              <div className="w-[120px] h-[120px] mx-auto">
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
              <div className="relative w-full text-xl p-2">
                {edit === user._id ? (
                  <div className="w-full flex justify-between items-center">
                    <select
                      className="border border-gray-300 rounded-md mx-auto bg-gray-100 text-sm px-2 py-1"
                      value={user.role}
                      onChange={(e) => handleChangeUserRole(e, user._id)}
                    >
                      {Object.values(ROLE).map((role, i) => {
                        return (
                          <option key={role + i} value={role}>
                            {role}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                ) : (
                  <p className="text-center uppercase text-sm my-1">
                    {user.role}
                  </p>
                )}

                <p className="font-bold capitalize line-clamp-1">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="line-clamp-1 text-sm">Email: {user?.email}</p>
                {user?.phone && (
                  <p className="line-clamp-1 text-sm">
                    Phone: +91 {user?.phone}
                  </p>
                )}
                <p className="text-sm font-semibold">
                  Created at: {moment(user?.createdAt).format("lll")}
                </p>
              </div>
              {currentUser?.role === "MASTER" && (
                <div className="absolute top-0 right-0 m-1 flex items-center justify-center cursor-pointer bg-pink-300 hover:bg-pink-700 hover:text-white rounded-full">
                  {edit === user._id ? (
                    <span className="p-2" onClick={handleSave}>
                      <FaSave />
                    </span>
                  ) : (
                    <span className="p-2" onClick={() => handleEdit(user._id)}>
                      <FaUserEdit />
                    </span>
                  )}
                </div>
              )}
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

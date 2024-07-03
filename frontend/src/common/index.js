const backendUrl = process.env.REACT_APP_BACKEND_URL;

const SummaryApi = {
  registerUser: {
    url: `${backendUrl}/api/register`,
    method: "POST",
  },
  loginUser: {
    url: `${backendUrl}/api/login`,
    method: "POST",
  },
  currentUserDetails: {
    url: `${backendUrl}/api/user-details`,
    method: "GET",
  },
  logoutUser: {
    url: `${backendUrl}/api/logout`,
    method: "GET",
  },
  allUsers: {
    url: `${backendUrl}/api/all-users`,
    method: "GET",
  },
  updateUser: {
    url: `${backendUrl}/api/update-user`,
    method: "POST",
  },
  uploadProduct: {
    url: `${backendUrl}/api/upload-product`,
    method: "POST",
  },
};

export default SummaryApi;

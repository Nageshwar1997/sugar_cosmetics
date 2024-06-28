const backendUrl = process.env.REACT_APP_BACKEND_URL;

const SummaryApi = {
  registerUser: {
    url: `${backendUrl}/api/register`,
    method: "POST",
  },
};

export default SummaryApi;
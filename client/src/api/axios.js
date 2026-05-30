import axios from "axios";

const api = axios.create({
  baseURL:
    `${import.meta.env.VITE_API_URL}/api` ||
    "http://localhost:5000/api",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
      console.log(response)
    if (error.response?.status === 401) {
      localStorage.removeItem("user");

      if (
        window.location.pathname !==
        "/login"
      ) {
        window.location.href =
          "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
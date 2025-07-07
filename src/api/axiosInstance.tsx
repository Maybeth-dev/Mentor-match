import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://mentor-match-backend-855f.onrender.com",
  withCredentials: true,
});

export default axiosInstance; 
export const setAuthToken = (token: string | null) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};
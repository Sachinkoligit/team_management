import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://team-management-plum.vercel.app/api",
});

export default axiosInstance;

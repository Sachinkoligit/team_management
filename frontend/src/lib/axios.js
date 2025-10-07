import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://team-management-pied.vercel.app/api",
});

export default axiosInstance;

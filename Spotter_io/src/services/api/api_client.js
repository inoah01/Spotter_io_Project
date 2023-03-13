import axios from "axios";

const axiosClient = axios.create({
  // Input API Base URL
  baseURL: "https://127.0.0.1:80/api/",
  responseType: "json",
  withCredentials: false,
});

export default axiosClient;

import axios from "axios";

// const BASE_URL = "http://localhost:5000/api/v1-0-3";

const axiosClient = axios.create({
  // baseURL: BASE_URL,
  timeout: 1000,
});

export default axiosClient;

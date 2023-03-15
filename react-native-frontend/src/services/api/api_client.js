import axios from "axios";

const BASE_URL = "http://127.0.0.1:5000/api/v1-0-3/";

const axiosClient = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
});

export default axiosClient;

import axios from "axios";
import Constants from "expo-constants";

// Importing base URL
const { baseURL } = Constants.manifest.extra;

const axiosClient = axios.create({
  baseURL: baseURL,
  timeout: 1000,
  headers: {
    'Accept': 'application/json'
  }
});

export default axiosClient;

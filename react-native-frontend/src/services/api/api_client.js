import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL

// const axios = require('axios');
const axiosClient = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {
    'Accept': 'application/json'
  }
});

export default axiosClient;

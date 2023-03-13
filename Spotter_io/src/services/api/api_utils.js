import axios from "axios";
import axiosClient from "./api_client";

export const user_login = async (data) => {
  try {
    const result = await axiosClient.request("/user/login", {
      method: "post",
      data: data,
    });
    return result;
  } catch (error) {
    if (error.response && error.response.data) {
      console.log(error.response.data);
    } else {
      console.log(error.code, error.message);
    }
  }
};

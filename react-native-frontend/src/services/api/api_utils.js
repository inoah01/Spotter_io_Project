import axios from "axios";
import axiosClient from "./api_client";


export const user_login = async (payload) => {
  if (!payload) {
    console.log("Data not received from handleLogIn");
    return;
  }
  console.log(axiosClient);

  await axiosClient.post("http://localhost:5443/api/v1-0-3/users/login", payload)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      })
};

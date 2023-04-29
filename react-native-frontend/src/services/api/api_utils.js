import axios from "axios";
import axiosClient from "./api_client";


export const user_login = async (payload) => {
  if (!payload) {
    console.log("Data not received from handleLogIn");
    return;
  }
  console.log("The axios Client is: ", axiosClient.defaults);
  console.log(payload);

  await axiosClient.post("/users/login", JSON.stringify(payload), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    })
};
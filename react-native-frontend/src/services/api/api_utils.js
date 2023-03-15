import axios from "axios";
import axiosClient from "./api_client";

export const user_login = async (payload) => {
  if (!payload) {
    console.log("Data not received from handleLogIn");
    return;
  }
  console.log(axiosClient);

  axiosClient
    .post("/user/login", payload, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error.response.payload);
    });
};

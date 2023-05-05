// TODO:
//  - Attach Firebase token to "Authorization" header in the format: Bearer {token} for all requests 2 protected routes
//    - Use const = headers = unprotectedHeaders / getProtectedHeaders(); to use appropriate headers
import axiosClient from "./api_client";
// import {getToken} from "../deviceStorage";


const unprotectedHeaders = {
  'Content-Type': 'application/json',
  'Accept-Type': 'application/json'
}

// async function getProtectedHeaders() {
//   const idToken = await getToken();
//   return {
//     'Authorization': `Bearer ${idToken}`,
//     'Content-Type': 'application/json',
//     'Accept': 'application/json'
//   };
// }

export const userLogin = async (payload) => {
  const headers = unprotectedHeaders;

  if (!payload) {
    console.log("Data not received from handleLogIn");
    return;
  }
  // DELETE: Console log statements for testing frontend-backend connection + axios request
  // console.log("The axios Client is: ", axiosClient.defaults);
  // console.log(payload);
  console.log("Sending request...");
  await axiosClient.post("/users/login", payload, {
    headers: headers
  })
    .then(response => {
      console.log("Request Successful", response.data);

    })
    .catch(error => {
      console.log("Request Failed", error.message);

      if (error.response) {
        console.log("Response data: ", error.response.data);
        console.log("Response status: ", error.response.status);
        console.log("Response headers: ", error.response.headers);
      } else if (error.request) {
        console.log("Error Request: ", error.request);
      } else {
        console.log("Error config: ", error.config);
      }
    })
  console.log("Request finished")
};
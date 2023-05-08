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

  try {
    const response = await axiosClient.post("/users/login", payload, {
      headers: headers,
    });
    console.log("The response data is: ", response.data);
    // Returning response data
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Request Failed: ", error.message);

    let errorMessage = "An error occurred while logging in.";

    if (error.response) {
      console.log("Response data: ", error.response.data);
      console.log("Response Status: ", error.response.status);
      console.log("Response headers: ", error.response.headers);
      errorMessage = error.response.data.message || errorMessage;
    } else if (error.request) {
      console.error("Error Request", error.request);
      errorMessage = "The server is not responding. Please try again later.";
    } else {
      console.error("Error config: ", error.config);
    }

    return { success: false, error: errorMessage };
  }
};



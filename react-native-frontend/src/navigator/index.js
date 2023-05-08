import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import UserStack from "./userStack";
import AuthStack from "./authStack";
import { useFirebaseTokenRefresher } from "../hooks/useFirebaseTokenRefresher";

export default function RootNavigation() {
  const { user, backendAuthenticated } = useAuth();

  const [backendErrorMessage, setBackendErrorMessage] = useState(null);

  const handleBackendError = (error) => {
    setBackendErrorMessage(error.message);
  };

  // Calling useFirebaseTokenRefresher hook to handle token refresh for all screens
  useFirebaseTokenRefresher();

  const isAuthenticated = user && backendAuthenticated;

  console.log("Backend Authentication status: ", backendAuthenticated);

  return isAuthenticated ? (
    <UserStack />
  ) : (
    <AuthStack
      backendErrorMessage={backendErrorMessage}
      handleBackendError={handleBackendError}
    />
  );
}

import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import UserStack from "./userStack";
import AuthStack from "./authStack";
import { useFirebaseTokenRefresher } from "../hooks/useFirebaseTokenRefresher";
import { useContext } from "react";
import { BackendAuthContext } from "../components/BackendAuthContext";

export default function RootNavigation() {
  const { user, backendAuthenticated } = useAuth();

  const [backendErrorMessage, setBackendErrorMessage] = useState(null);

  const { backendAuthStatus } = useContext(BackendAuthContext);

  const handleBackendError = (error) => {
    setBackendErrorMessage(error.message);
  };

  // Calling useFirebaseTokenRefresher hook to handle token refresh for all screens
  useFirebaseTokenRefresher();

  const isAuthenticated = user && backendAuthStatus;

  console.log("Backend Authentication status: ", backendAuthStatus);

  return isAuthenticated ? (
    <UserStack />
  ) : (
    <AuthStack
      backendErrorMessage={backendErrorMessage}
      handleBackendError={handleBackendError}
    />
  );
}

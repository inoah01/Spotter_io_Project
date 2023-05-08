import React from "react";
import "./src/services/firebase/firebase";
import RootNavigation from "./src/navigator";
import { ErrorProvider } from "./src/components/ErrorContext";
import { LoginAttemptsProvider } from "./src/components/LoginAttemptsContext";

const YourApp = () => {
  return (
    <ErrorProvider>
      <LoginAttemptsProvider>
        <RootNavigation />
      </LoginAttemptsProvider>
    </ErrorProvider>
  );
};

export default YourApp;

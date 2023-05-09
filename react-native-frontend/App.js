import React, {useState} from "react";
import "./src/services/firebase/firebase";
import RootNavigation from "./src/navigator";
import { ErrorProvider } from "./src/components/ErrorContext";
import { LoginAttemptsProvider } from "./src/components/LoginAttemptsContext";
import {BackendAuthContext} from "./src/components/BackendAuthContext";

const YourApp = () => {
    const [backendAuthStatus, setBackendAuthStatus] = useState(false);

    return (
      <BackendAuthContext.Provider value={{ backendAuthStatus, setBackendAuthStatus }}>
        <ErrorProvider>
          <LoginAttemptsProvider>
            <RootNavigation />
          </LoginAttemptsProvider>
        </ErrorProvider>
      </BackendAuthContext.Provider>
  );
};

export default YourApp;

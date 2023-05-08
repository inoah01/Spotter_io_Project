import React, { useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from '../services/firebase/firebase';
import { removeToken, storeToken } from '../services/deviceStorage';
import { userLogin } from '../services/api/api_utils';
import { ErrorContext } from '../components/ErrorContext';
import {useLoginAttempts} from "../components/LoginAttemptsContext";

// Can be compiled into firebase.js?
export const auth = getAuth(app);

export function useAuth() {
  const { loginAttempts } = useLoginAttempts();
  const [user, setUser] = React.useState(null);
  const [backendAuthenticated, setBackendAuthenticated] = React.useState(false);
  const { showErrorModal } = useContext(ErrorContext);

  useEffect(() => {
    return onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          console.log('The user object for verification: ', user);
          const loginResponse = await userLogin(user);
          if (loginResponse.success) {
            const idToken = await user.getIdToken();
            await storeToken(idToken);
            setBackendAuthenticated(true);
          } else {
            await removeToken();
            setBackendAuthenticated(false);
            // Pass the error message to the error handling function in your app's state or context
            showErrorModal(loginResponse.error);
          }
        } catch (error) {
          console.error('Error during login authentication: ', error);
          await removeToken();
          setBackendAuthenticated(false);
          showErrorModal(error.message);
        }
        setUser(user);
      } else {
        setUser(null);
        setBackendAuthenticated(false);
        await removeToken();
      }
    });
  }, [loginAttempts]);

  return {
    user,
    backendAuthenticated,
  };
}

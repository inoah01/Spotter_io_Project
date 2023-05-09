import React, { useContext, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from '../services/firebase/firebase';
import { removeToken, storeToken } from '../services/deviceStorage';
import { ErrorContext } from '../components/ErrorContext';
import { useLoginAttempts } from "../components/LoginAttemptsContext";

export const auth = getAuth(app);

export function useAuth() {
  const { loginAttempts } = useLoginAttempts();
  const [user, setUser] = React.useState(null);
  const { showErrorModal } = useContext(ErrorContext);

  useEffect(() => {
    return onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          console.log('The user object for verification: ', user);
          const idToken = await user.getIdToken();
          await storeToken(idToken);
        } catch (error) {
          console.error('Error during login authentication: ', error);
          await removeToken();
          showErrorModal(error.message);
        }
        setUser(user);
      } else {
        setUser(null);
        await removeToken();
      }
    });
  }, [loginAttempts]);

  return {
    user
  };
}

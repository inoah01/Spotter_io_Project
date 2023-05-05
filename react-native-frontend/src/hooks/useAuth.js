import React, {useEffect} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import app from "../services/firebase/firebase";

// Can be compiled into firebase.js?
export const auth = getAuth(app);

export function useAuth() {
  const [user, setUser] = React.useState(null);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for list of available properties
        setUser(user);
      } else {
        // User is signed out
        setUser(null);
      }
    });
  }, []);

  return {
    user,
  };
}

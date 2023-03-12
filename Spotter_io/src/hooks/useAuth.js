import React, { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import app from "../firebase";

const auth = getAuth(app);

export function useAuth() {
  const [user, setUser] = React.useState(null);

  useEffect(() => {
    const unsubscribeFromAuthStateChanged = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for list of available properties
        setUser(user);
      } else {
        // User is signed out
        setUser(null);
      }
    });

    return unsubscribeFromAuthStateChanged;
  }, []);

  return {
    user,
  };
}

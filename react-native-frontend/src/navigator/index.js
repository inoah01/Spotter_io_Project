import React from "react";
import { useAuth } from "../hooks/useAuth";
import UserStack from "./userStack";
import AuthStack from "./authStack";
import {useFirebaseTokenRefresher} from "../hooks/useFirebaseTokenRefresher";


export default function RootNavigation() {
  const { user } = useAuth();

  // Calling useFirebaseTokenRefresher hook to handle token refresh for all screens
  useFirebaseTokenRefresher();

  return user ? <UserStack /> : <AuthStack />;
}

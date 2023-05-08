import React, { createContext, useContext, useState } from 'react';

const LoginAttemptsContext = createContext();

export function useLoginAttempts() {
  return useContext(LoginAttemptsContext);
}

export function LoginAttemptsProvider({ children }) {
  const [loginAttempts, setLoginAttempts] = useState(0);

  return (
    <LoginAttemptsContext.Provider value={{ loginAttempts, setLoginAttempts }}>
      {children}
    </LoginAttemptsContext.Provider>
  );
}

// In ErrorContext.js
import React, { createContext, useState } from 'react';

export const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const showErrorModal = (message) => {
    setErrorMessage(message);
    setErrorModalVisible(true);
  };

  const hideErrorModal = () => {
    setErrorModalVisible(false);
  };

  return (
    <ErrorContext.Provider
      value={{
        errorModalVisible,
        errorMessage,
        showErrorModal,
        hideErrorModal,
      }}
    >
      {children}
    </ErrorContext.Provider>
  );
};

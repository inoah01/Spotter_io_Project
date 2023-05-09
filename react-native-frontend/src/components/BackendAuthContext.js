import { createContext } from 'react';

export const BackendAuthContext = createContext({
    setBackendAuthStatus: () => {},
});
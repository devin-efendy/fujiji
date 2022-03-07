import { createContext, useContext } from 'react';

const SessionContext = createContext({
  isSignedIn: false,
  userData: undefined,
  authToken: undefined,
  setCredentials: () => {},
  signOutUser: () => {},
});

export const SessionProvider = SessionContext.Provider;

export const useSession = () => useContext(SessionContext);

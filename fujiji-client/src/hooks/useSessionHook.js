import { useState } from 'react';

export default function useSessionHook() {
  const clientSide = typeof window !== 'undefined';

  const [userData, setUserData] = useState(
    clientSide ? JSON.parse(localStorage.getItem('user')) : undefined,
  );
  const [authToken, setAuthToken] = useState(
    clientSide ? localStorage.getItem('token') : '',
  );

  function setCredentials(user, token) {
    setUserData(user);
    setAuthToken(token);

    // TODO: This is VERY unsafe but easy to implement for this sprint
    // need to encrypt user data before storing, etc...
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  }

  function signOutUser() {
    setUserData(undefined);
    setAuthToken('');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  return {
    userData, authToken, setCredentials, signOutUser,
  };
}

import React from 'react';
import { SessionProvider } from '../../context/session';
import NavBar from './NavBar';

export default {
  title: 'NavBar',
  component: NavBar,
};

export function LoggedOut({ ...args }) {
  const { isSignedIn, name } = args;
  return (
    <SessionProvider
      value={{
        isSignedIn,
        userData: { name },
      }}
    >
      <NavBar />
    </SessionProvider>
  );
}

LoggedOut.args = {
  isSignedIn: false,
  name: '',
};

export function SignedIn({ ...args }) {
  const { isSignedIn, name } = args;
  return (
    <SessionProvider value={{ isSignedIn, userData: { name } }}>
      <NavBar />
    </SessionProvider>
  );
}

SignedIn.args = {
  isSignedIn: true,
  name: 'John Doe',
};

import React from 'react';
import { SessionProvider } from '../../context/session';
import NavBar from './NavBar';

export default {
  title: 'NavBar',
  component: NavBar,
};

function Template({ ...args }) {
  return (
    <SessionProvider value={{ ...args }}>
      <NavBar />
    </SessionProvider>
  );
}

export const Default = Template.bind({});

export const LoggedOut = Template.bind({});

export const SignedIn = Template.bind({});

LoggedOut.args = {
  isSignedIn: false,
};

SignedIn.args = {
  isSignedIn: true,
};

Default.args = {
  isSignedIn: false,
};

// export const Primary;

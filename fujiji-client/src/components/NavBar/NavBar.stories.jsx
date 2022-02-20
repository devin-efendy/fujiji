import React from 'react';
import NavBar from './NavBar';

export default {
  title: 'NavBar',
  component: NavBar,
};

function Template({ ...args }) {
  return <NavBar {...args} />;
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

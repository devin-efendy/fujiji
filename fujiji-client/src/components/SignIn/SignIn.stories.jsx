import React from 'react';
import SignIn from './SignIn';

export default {
  title: 'SignIn',
  component: SignIn,
};

function Template({ ...args }) {
  return <SignIn {...args} />;
}

export const Default = Template.bind({});

Default.args = {
  isSignUp: false,
};

// export const Primary;

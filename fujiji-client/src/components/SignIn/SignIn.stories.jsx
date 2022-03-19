import React from 'react';
import SignIn from './SignIn';

export default {
  title: 'SignIn',
  component: SignIn,
};

export function SignInForm({ ...args }) {
  return <SignIn {...args} />;
}

SignInForm.args = {
  isSignUp: false,
};

export function SignUpForm({ ...args }) {
  return <SignIn {...args} />;
}

SignUpForm.args = {
  isSignUp: true,
};

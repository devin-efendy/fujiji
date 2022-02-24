import { render, fireEvent } from '@testing-library/react';

import SignIn from './SignIn';

describe('SignIn', () => {
  it('should render login components properly', () => {
    const { getByText } = render(<SignIn />);
    expect(getByText("Don't have an account?")).toBeInTheDocument();
    expect(getByText('Login')).toBeInTheDocument();
  });

  it('should render sign-up components properly', () => {
    const { getByText } = render(<SignIn isSignUp />);
    expect(getByText('Already have an account?')).toBeInTheDocument();
    expect(getByText('Sign Up')).toBeInTheDocument();
  });

  it('should render empty error messages when submitting an empty form', () => {
    const { getByText } = render(<SignIn />);

    fireEvent.click(getByText('Login'), { bubbles: true });

    expect(getByText("Email can't be empty")).toBeInTheDocument();
    expect(getByText("Password can't be empty")).toBeInTheDocument();
  });

  it('should render invalid error messages when submitting invalid email and password', () => {
    const { getByText, getByLabelText } = render(<SignIn />);

    fireEvent.change(getByLabelText('email'), {
      target: { value: 'invalid email' },
    });
    fireEvent.change(getByLabelText('password'), {
      target: { value: '1234567' },
    });

    fireEvent.click(getByText('Login'), { bubbles: true });

    expect(getByText('Invalid email')).toBeInTheDocument();
    expect(
      getByText('Password need at least 8 characters'),
    ).toBeInTheDocument();
  });

  it('should render show and hide password icon properly', () => {
    const { getByLabelText } = render(<SignIn />);

    fireEvent.click(getByLabelText('Show password'), { bubbles: true });
    expect(getByLabelText('Hide password')).toBeInTheDocument();

    fireEvent.click(getByLabelText('Hide password'), { bubbles: true });
    expect(getByLabelText('Show password')).toBeInTheDocument();
  });
});

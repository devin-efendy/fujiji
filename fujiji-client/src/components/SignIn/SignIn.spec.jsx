import { render, fireEvent, act } from '@testing-library/react';

import SignIn from './SignIn';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: jest.fn(),
    };
  },
}));

describe('SignIn Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('sign-in', () => {
    it('should render login components properly', () => {
      const { getByText } = render(<SignIn />);
      expect(getByText("Don't have an account?")).toBeInTheDocument();
      expect(getByText('Login')).toBeInTheDocument();
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

    it('should not execute onSubmit when authentication failed for /auth/signin', async () => {
      const mockOnSubmit = jest.fn();

      mockOnSubmit.mockResolvedValueOnce({
        error: 'error_message',
        status: 401,
      });

      const { getByText, getByLabelText } = render(
        <SignIn onSubmit={mockOnSubmit} />,
      );

      fireEvent.change(getByLabelText('email'), {
        target: { value: 'dev@email.com' },
      });
      fireEvent.change(getByLabelText('password'), {
        target: { value: '12345678' },
      });

      await act(async () => {
        fireEvent.click(getByLabelText('submit-user-form-button'), {
          bubbles: true,
        });
      });

      expect(getByText('error_message')).toBeInTheDocument();

      mockOnSubmit.mockResolvedValueOnce({
        error: 'error_message_2',
        status: 404,
      });

      await act(async () => {
        fireEvent.click(getByLabelText('submit-user-form-button'), {
          bubbles: true,
        });
      });

      expect(getByText('error_message_2')).toBeInTheDocument();
    });
  });

  describe('sign-up', () => {
    it('should render sign-up components properly', () => {
      const { getByText } = render(<SignIn isSignUp />);
      expect(getByText('Already have an account?')).toBeInTheDocument();
      expect(getByText('Sign Up')).toBeInTheDocument();
    });

    it('should execute when sign-up form filled correctly', () => {
      const mockOnSubmit = jest.fn();

      mockOnSubmit.mockResolvedValue({
        data: {
          userId: 1,
          email: 'dev@email.com',
          password: '12345678',
          name: 'First Last',
          phoneNumber: '2041231234',
          authToken: '123',
        },
      });

      const { getByLabelText } = render(
        <SignIn onSubmit={mockOnSubmit} isSignUp />,
      );

      fireEvent.change(getByLabelText('email'), {
        target: { value: 'dev@email.com' },
      });
      fireEvent.change(getByLabelText('password'), {
        target: { value: '12345678' },
      });
      fireEvent.change(getByLabelText('first-name'), {
        target: { value: 'First' },
      });
      fireEvent.change(getByLabelText('last-name'), {
        target: { value: 'Last' },
      });
      fireEvent.change(getByLabelText('phone-number'), {
        target: { value: '2041231234' },
      });

      fireEvent.click(getByLabelText('submit-user-form-button'), {
        bubbles: true,
      });
    });

    it('should return empty name message if first name is empty', () => {
      const { getByText, getByLabelText } = render(<SignIn isSignUp />);

      fireEvent.click(getByLabelText('submit-user-form-button'), {
        bubbles: true,
      });

      expect(getByText("Name can't be empty")).toBeInTheDocument();
    });

    it('should return error message for empty or invalid phone number', () => {
      const { getByText, getByLabelText } = render(<SignIn isSignUp />);

      fireEvent.click(getByLabelText('submit-user-form-button'), {
        bubbles: true,
      });

      expect(getByText("Phone number can't be empty")).toBeInTheDocument();

      fireEvent.change(getByLabelText('phone-number'), {
        target: { value: 'invalid' },
      });

      fireEvent.click(getByLabelText('submit-user-form-button'), {
        bubbles: true,
      });

      expect(getByText('Phone number is not valid')).toBeInTheDocument();
    });
  });
});

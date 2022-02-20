import { render, fireEvent } from '@testing-library/react';

import NavBar from './NavBar';

describe('NavBar', () => {
  it('should render sign-in and sign-up button when not logged in', () => {
    const { getByText } = render(<NavBar />);
    expect(getByText('Sign In')).toBeInTheDocument();
    expect(getByText('Sign Up')).toBeInTheDocument();
  });

  it('should render post and avatar button when logged in', () => {
    const { getByText, getByLabelText } = render(<NavBar isSignedIn />);
    expect(getByLabelText('post-listing-button')).toBeInTheDocument();
    expect(getByLabelText('profile-button')).toBeInTheDocument();

    // test expanded link after clicking profile button
    fireEvent.click(getByLabelText('profile-button'), { bubble: true });
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('My Listings')).toBeInTheDocument();
    expect(getByText('Sign Out')).toBeInTheDocument();
  });
});

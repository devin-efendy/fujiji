import { render } from '@testing-library/react';

import NavBar from './NavBar';

describe('NavBar', () => {
  it('should render sign-in and sign-up button when not logged in', () => {
    const { getByText } = render(<NavBar />);
    expect(getByText('Sign In')).toBeInTheDocument();
  });
});

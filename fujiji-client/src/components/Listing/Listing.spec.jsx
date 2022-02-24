import { render, fireEvent } from '@testing-library/react';

import Listing from './Listing';
import mockAdListing from '../../__mocks__/mockAdListing';

describe('Listing', () => {
  it('should render properly', () => {
    const { getByText } = render(<Listing {...mockAdListing[0]} />);
    expect(getByText(mockAdListing[0].title)).toBeInTheDocument();
    expect(getByText(mockAdListing[0].description)).toBeInTheDocument();
    expect(getByText('new')).toBeInTheDocument();
    expect(getByText('21 February 2022')).toBeInTheDocument();
  });

  it('should render with empty description', () => {
    const mockPropsWithoutDescription = {
      ...mockAdListing[2],
    };
    const { getByText } = render(
      <Listing {...mockPropsWithoutDescription} />,
    );
    expect(getByText(mockPropsWithoutDescription.title)).toBeInTheDocument();
    expect(
      getByText('No description provided by the seller.'),
    ).toBeInTheDocument();
    expect(getByText('used')).toBeInTheDocument();
    expect(getByText('21 February 2022')).toBeInTheDocument();
  });

  it('should not render invalid date', () => {
    const mockPropsWithInvalidDate = {
      ...mockAdListing[0],
      postingDate: '',
    };
    const { queryByText } = render(<Listing {...mockPropsWithInvalidDate} />);

    expect(queryByText('21 February 2022')).toBeFalsy();
  });

  it('should execute onContactClick callback when clicking the contact button', () => {
    const mockPropsWithInvalidDate = {
      ...mockAdListing[0],
    };

    const mockOnContactClick = jest.fn();

    const { getByLabelText } = render(
      <Listing
        {...mockPropsWithInvalidDate}
        onContactClick={mockOnContactClick}
      />,
    );

    fireEvent.click(getByLabelText('contact-seller-button'), { bubbles: true });
    expect(mockOnContactClick).toHaveBeenCalledTimes(1);
  });
});

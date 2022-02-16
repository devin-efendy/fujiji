import { render } from '@testing-library/react';

import AdListing from './AdListing';

const mockProps = {
  imageUrl: 'https://bit.ly/2Z4KKcF',
  imageAlt: 'Rear view of modern home with pool',
  beds: 3,
  baths: 2,
  title: 'Modern home in city center in the heart of historic Los Angeles',
  formattedPrice: '$1,900.00',
  reviewCount: 34,
  rating: 4,
};

describe('TestComponent', () => {
  it('should render properly', () => {
    const { getByText } = render(<AdListing {...mockProps} />);
    expect(
      getByText(
        'Modern home in city center in the heart of historic Los Angeles',
      ),
    ).toBeInTheDocument();
  });
});

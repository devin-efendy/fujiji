import { render } from '@testing-library/react';

import AdListingCard from './AdListingCard';
import mockAdListing from '../../__mocks__/mockAdListing';

describe('AdListingCard', () => {
  it('should render properly', () => {
    const { getByText } = render(<AdListingCard {...mockAdListing[0]} />);
    expect(getByText(mockAdListing[0].title)).toBeInTheDocument();
    expect(getByText(mockAdListing[0].description)).toBeInTheDocument();
    expect(getByText('new')).toBeInTheDocument();
    expect(getByText('21 Feb 2022')).toBeInTheDocument();
  });

  it('should render with empty description', () => {
    const mockPropsWithoutDescription = {
      ...mockAdListing[2],
    };
    const { getByText, queryByTestId } = render(
      <AdListingCard {...mockPropsWithoutDescription} />,
    );
    expect(getByText(mockPropsWithoutDescription.title)).toBeInTheDocument();
    expect(queryByTestId('DESC_TEST_ID')).toBeFalsy();

    expect(getByText('used')).toBeInTheDocument();
    expect(getByText('21 Feb 2022')).toBeInTheDocument();
  });

  it('should not render invalid date', () => {
    const mockPropsWithInvalidDate = {
      ...mockAdListing[0],
      postingDate: '',
    };
    const { queryByText } = render(
      <AdListingCard {...mockPropsWithInvalidDate} />,
    );

    expect(queryByText('21 Feb 2022')).toBeFalsy();
  });

  it('should not render boosted badge', () => {
    const mockBoostedListingProps = {
      ...mockAdListing[0],
      isBoosted: true,
    };

    const { getByTestId } = render(
      <AdListingCard {...mockBoostedListingProps} />,
    );

    expect(getByTestId('TEST_BOOST_ICON')).toBeInTheDocument();
  });
});

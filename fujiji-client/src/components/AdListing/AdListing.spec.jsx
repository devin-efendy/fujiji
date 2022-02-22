import { render } from '@testing-library/react';

import AdListing from './AdListing';
import mockAdListing from '../../__mocks__/mockAdListing';

describe('TestComponent', () => {
  it('should render properly', () => {
    const { getByText } = render(<AdListing {...mockAdListing[0]} />);
    expect(getByText(mockAdListing[0].title)).toBeInTheDocument();
    expect(getByText(mockAdListing[0].description)).toBeInTheDocument();
    expect(getByText('Brand New')).toBeInTheDocument();
    expect(getByText('21 Feb 2022')).toBeInTheDocument();
  });

  it('should render with empty description', () => {
    const mockPropsWithoutDescription = {
      ...mockAdListing[0],
      description: '',
    };
    const { getByText, queryByText } = render(
      <AdListing {...mockPropsWithoutDescription} />,
    );
    expect(getByText(mockPropsWithoutDescription.title)).toBeInTheDocument();
    expect(queryByText(mockAdListing[0].description)).toBeFalsy();
    expect(getByText('Brand New')).toBeInTheDocument();
    expect(getByText('21 Feb 2022')).toBeInTheDocument();
  });

  it('should render without any Badges', () => {
    const mockPropsWithoutCondition = {
      ...mockAdListing[0],
      condition: '',
    };
    const { queryByText } = render(
      <AdListing {...mockPropsWithoutCondition} />,
    );

    expect(queryByText('Brand New')).toBeFalsy();
    expect(queryByText('Used')).toBeFalsy();
  });

  it('should not render invalid date', () => {
    const mockPropsWithInvalidDate = {
      ...mockAdListing[0],
      postingDate: '',
    };
    const { queryByText } = render(
      <AdListing {...mockPropsWithInvalidDate} />,
    );

    expect(queryByText('21 Feb 2022')).toBeFalsy();
  });
});

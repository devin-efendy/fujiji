import { render } from '@testing-library/react';

import AdListing from './AdListing';
import mockAdListing from '../../__mocks__/mockAdListing';

describe('TestComponent', () => {
  it('should render properly', () => {
    const { getByText } = render(<AdListing {...mockAdListing[0]} />);
    expect(getByText(mockAdListing[0].title)).toBeInTheDocument();
    expect(getByText(mockAdListing[0].description)).toBeInTheDocument();
    expect(getByText('Brand New')).toBeInTheDocument();
  });
});

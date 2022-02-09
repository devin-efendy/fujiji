import { render } from '@testing-library/react';

import AdListings from './AdListings';

describe('TestComponent', () => {
  test('should render properly', () => {
    const { getByText } = render(
      <AdListings data={['test1', 'test2', 'test3']} />,
    );
    expect(getByText('test1')).toBeInTheDocument();
    expect(getByText('test2')).toBeInTheDocument();
    expect(getByText('test3')).toBeInTheDocument();
  });
});

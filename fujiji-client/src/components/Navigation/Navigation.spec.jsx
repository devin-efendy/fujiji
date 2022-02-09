import { render } from '@testing-library/react';

import Navigation from './Navigation';

describe('Navigation', () => {
  test('should render properly', () => {
    const mockTitle = 'MOCK_TITLE';
    const { getByText } = render(<Navigation title={mockTitle} />);
    expect(getByText(mockTitle)).toBeInTheDocument();
  });
});

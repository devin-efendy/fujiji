import { render } from '@testing-library/react';

import ConditionBadge from './ConditionBadge';

describe('ConditionBadge', () => {
  it('should render new badge', () => {
    const { getByText } = render(<ConditionBadge condition="new" />);
    expect(getByText('new')).toBeInTheDocument();
  });

  it('should render used badge', () => {
    const { getByText } = render(<ConditionBadge condition="used" />);
    expect(getByText('used')).toBeInTheDocument();
  });

  it('should render refurbished badge', () => {
    const { getByText } = render(<ConditionBadge condition="refurbished" />);
    expect(getByText('refurbished')).toBeInTheDocument();
  });
});

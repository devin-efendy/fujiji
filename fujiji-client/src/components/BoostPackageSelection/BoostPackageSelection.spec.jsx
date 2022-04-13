import { render, fireEvent } from '@testing-library/react';

import BoostPackageSelection from './BoostPackageSelection';

const packages = [
  { id: 0, name: '3 Days Boost', price: 5 },
  { id: 1, name: '7 Days Boost', price: 10 },
  { id: 2, name: '30 Days Boost', price: 30 },
];

describe('BoostPackageSelection', () => {
  it('should render component successfully', () => {
    const { getByText } = render(<BoostPackageSelection />);
    expect(getByText('3 Days Boost')).toBeInTheDocument();
    expect(getByText('7 Days Boost')).toBeInTheDocument();
    expect(getByText('30 Days Boost')).toBeInTheDocument();
  });

  it('should successfully call onContinue callback with selected ID', () => {
    const mockOnContinue = jest.fn();
    const { getByLabelText } = render(
      <BoostPackageSelection onContinue={mockOnContinue} />,
    );

    fireEvent.click(
      getByLabelText(`select ${packages[1].name} package button`),
      { bubbles: true },
    );

    fireEvent.click(getByLabelText('continue-to-payment-buttons'), {
      bubbles: true,
    });

    expect(mockOnContinue).toHaveBeenCalledWith(packages[1].id);
  });
});

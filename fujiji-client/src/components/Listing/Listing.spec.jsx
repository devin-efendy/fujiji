import { render, fireEvent } from '@testing-library/react';

import { useRouter } from 'next/router';
import { postBoost } from '../../server/api';

import Listing from './Listing';
import mockAdListing from '../../__mocks__/mockAdListing';

jest.mock(
  '../Stripe/Stripe',
  () => function () {
    const mockStr = 'mock stripe';
    return <div>{mockStr}</div>;
  },
);

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    route: '/',
    pathname: '',
    query: '',
    asPath: '',
    reload: jest.fn(),
    push: jest.fn(),
    replace: jest.fn(),
  })),
}));

jest.mock('../../server/api', () => ({
  postBoost: jest.fn(),
}));

describe('Listing', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render properly', () => {
    const { getByText, getByLabelText, queryByLabelText } = render(
      <Listing {...mockAdListing[0]} />,
    );
    expect(getByText(mockAdListing[0].title)).toBeInTheDocument();
    expect(getByText(mockAdListing[0].description)).toBeInTheDocument();
    expect(getByText('new')).toBeInTheDocument();
    expect(getByText('21 February 2022')).toBeInTheDocument();
    expect(getByLabelText('contact-seller-button')).toBeInTheDocument();
    expect(queryByLabelText('edit-listing-button')).toBeFalsy();
  });

  it("should render edit button if this listing is seller's", () => {
    const { getByText, getByLabelText, queryByLabelText } = render(
      <Listing {...mockAdListing[0]} isSeller />,
    );
    expect(getByText(mockAdListing[0].title)).toBeInTheDocument();
    expect(getByText(mockAdListing[0].description)).toBeInTheDocument();
    expect(getByText('new')).toBeInTheDocument();
    expect(getByText('21 February 2022')).toBeInTheDocument();
    expect(getByLabelText('edit-listing-button')).toBeInTheDocument();
    expect(queryByLabelText('contact-seller-button')).toBeFalsy();
  });

  it('should render with empty description', () => {
    const mockPropsWithoutDescription = {
      ...mockAdListing[2],
    };
    const { getByText } = render(<Listing {...mockPropsWithoutDescription} />);
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

  it('should show boosted days remaining', () => {
    const mockBoostedListingProps = {
      ...mockAdListing[0],
      boostDayLeft: 3,
      isSeller: true,
    };

    const { getByText } = render(<Listing {...mockBoostedListingProps} />);

    expect(
      getByText('This listing is boosted. 3 days remaining.'),
    ).toBeInTheDocument();
  });

  it('redirect to edit page', () => {
    const mockRouterPush = jest.fn();

    useRouter.mockImplementation(() => ({
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      reload: jest.fn(),
      push: mockRouterPush,
      replace: jest.fn(),
    }));

    postBoost.mockResolvedValueOnce({ status: 200 });

    const { getByLabelText } = render(
      <Listing {...mockAdListing[0]} isSeller />,
    );

    fireEvent.click(getByLabelText('edit-listing-button'), { bubbles: true });

    expect(mockRouterPush).toHaveBeenCalled();
  });

  it('open boost package modal', () => {
    const mockRouterReplace = jest.fn();

    useRouter.mockImplementation(() => ({
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      reload: jest.fn(),
      push: jest.fn(),
      replace: mockRouterReplace,
    }));

    const { getByLabelText } = render(
      <Listing {...mockAdListing[0]} isSeller boostDayLeft={0} />,
    );

    fireEvent.click(getByLabelText('boost-listing-button'), { bubbles: true });

    expect(mockRouterReplace).toHaveBeenCalled();
  });

  it('redirects with successful result and packageID', () => {
    useRouter.mockImplementation(() => ({
      route: '/',
      pathname: '',
      query: {
        result: 'success',
        packageID: 1,
      },
      asPath: '',
      reload: jest.fn(),
      push: jest.fn(),
      replace: jest.fn(),
    }));

    postBoost.mockResolvedValueOnce({ status: 200 });

    render(<Listing {...mockAdListing[0]} />);

    expect(postBoost).toHaveBeenCalled();
  });

  it('redirects with successful result and 500 error', () => {
    useRouter.mockImplementation(() => ({
      route: '/',
      pathname: '',
      query: {
        result: 'success',
      },
      asPath: '',
      reload: jest.fn(),
      push: jest.fn(),
      replace: jest.fn(),
    }));

    postBoost.mockResolvedValueOnce({ error: 'some error', status: '404' });

    render(<Listing {...mockAdListing[0]} />);

    expect(postBoost).toHaveBeenCalled();
  });

  it('redirects with successful result and 500 error', () => {
    useRouter.mockImplementation(() => ({
      route: '/',
      pathname: '',
      query: {
        result: 'success',
      },
      asPath: '',
      reload: jest.fn(),
      push: jest.fn(),
      replace: jest.fn(),
    }));

    postBoost.mockResolvedValueOnce({ error: 'some error', status: '500' });

    render(<Listing {...mockAdListing[0]} />);

    expect(postBoost).toHaveBeenCalled();
  });

  it('redirects with error result', () => {
    useRouter.mockImplementation(() => ({
      route: '/',
      pathname: '',
      query: {
        result: 'error',
      },
      asPath: '',
      reload: jest.fn(),
      push: jest.fn(),
      replace: jest.fn(),
    }));

    render(<Listing {...mockAdListing[0]} />);

    expect(postBoost).toHaveBeenCalledTimes(0);
  });
});

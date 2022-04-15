import { render, fireEvent, act } from '@testing-library/react';

import CommentForm from './CommentForm';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      reload: jest.fn(),
    };
  },
}));

const mockDefaultProps = {
  listingID: 12,
  userName: 'Jane',
  onSubmit: jest.fn(),
};

describe('CommentForm', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render properly', () => {
    const { getByText } = render(<CommentForm {...mockDefaultProps} />);
    expect(getByText(mockDefaultProps.userName)).toBeInTheDocument();
  });

  it('should render input changes in the textarea', () => {
    const { getByLabelText, getByText } = render(
      <CommentForm {...mockDefaultProps} />,
    );

    fireEvent.change(getByLabelText('comment-input'), {
      target: { value: 'new comment' },
    });

    expect(getByText('new comment')).toBeInTheDocument();
  });

  it('should render error message when submitting empty comment', () => {
    const { getByLabelText, getByText } = render(
      <CommentForm {...mockDefaultProps} />,
    );

    fireEvent.click(getByLabelText('submit-comment-button'));
    expect(getByText("comment can't be empty")).toBeInTheDocument();
  });

  it('should submit the POST form when comment is valid', async () => {
    mockDefaultProps.onSubmit.mockResolvedValueOnce({ status: 200 });

    const { getByLabelText } = render(<CommentForm {...mockDefaultProps} />);

    fireEvent.change(getByLabelText('comment-input'), {
      target: { value: 'new comment' },
    });

    await act(async () => {
      fireEvent.click(getByLabelText('submit-comment-button'));
    });

    expect(getByLabelText('comment-input')).toHaveValue('');
    expect(mockDefaultProps.onSubmit).toHaveBeenCalledTimes(1);
  });

  it('should show error message when submission failed', async () => {
    mockDefaultProps.onSubmit.mockResolvedValueOnce({ error: 'failed' });

    const { getByLabelText, getByText } = render(
      <CommentForm {...mockDefaultProps} />,
    );

    fireEvent.change(getByLabelText('comment-input'), {
      target: { value: 'new comment' },
    });

    await act(async () => {
      fireEvent.click(getByLabelText('submit-comment-button'));
    });

    expect(getByLabelText('comment-input')).toHaveValue('new comment');
    expect(getByText('Oops! Something went wrong...')).toBeInTheDocument();
    expect(mockDefaultProps.onSubmit).toHaveBeenCalledTimes(1);
  });

  it('should successfully submit a reply', async () => {
    const mockReplyProps = {
      ...mockDefaultProps,
      isReply: true,
    };

    mockReplyProps.onSubmit.mockResolvedValueOnce({ status: 200 });

    const { getByLabelText } = render(
      <CommentForm {...mockReplyProps} />,
    );

    fireEvent.change(getByLabelText('reply-input'), {
      target: { value: 'new reply' },
    });

    await act(async () => {
      fireEvent.click(getByLabelText('submit-reply-button'));
    });

    expect(mockReplyProps.onSubmit).toHaveBeenCalledTimes(1);
  });
});

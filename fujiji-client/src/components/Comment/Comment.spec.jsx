import { render, fireEvent, act } from '@testing-library/react';
import {
  updateComment,
  deleteCommentById,
  deleteCommentReplyById,
} from '../../server/api';

import Comment from './Comment';

const mockRouterReload = jest.fn();

jest.mock('next/router', () => ({
  __esModule: true, // Use it when dealing with esModules
  ...jest.requireActual('next/router'),
  useRouter: jest.fn().mockImplementation(() => ({
    reload: mockRouterReload,
  })),
}));

jest.mock('../../server/api', () => ({
  updateComment: jest.fn(),
  deleteCommentById: jest.fn(),
  deleteCommentReplyById: jest.fn(),
  replyComment: jest.fn(),
}));

const mockDefaultProps = {
  commentID: 1,
  posterName: 'John Doe',
  comment:
    'Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  isSeller: false,
  isEditable: false,
  isHighlighted: false,
  commentDate: '2022-02-21',
};

const mockReplyProps = {
  commentID: 1,
  posterName: 'The Seller',
  comment: 'reply from seller',
  isSeller: true,
  isReply: true,
  isEditable: true,
  isHighlighted: false,
  commentDate: '2022-02-21',
};

const mockIsSellerProps = {
  commentID: 2,
  posterName: 'John Doe',
  comment:
    'Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  isSeller: true,
  showSellerOptions: true,
  isEditable: false,
  isHighlighted: false,
  commentDate: '2022-02-21',
};

const mockIsEditableProps = {
  commentID: 3,
  posterName: 'John Doe',
  comment:
    'Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  isSeller: false,
  isEditable: true,
  isHighlighted: false,
  commentDate: '2022-02-21',
};

const mockModifiedDateProps = {
  commentID: 4,
  posterName: 'John Doe',
  comment:
    'Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  isSeller: false,
  isEditable: true,
  isHighlighted: false,
  commentDate: '2022-02-21',
  modifiedDate: '2022-02-25',
};

describe('Comment', () => {
  afterEach(() => {
    jest.clearAllMocks();
    document.getElementsByTagName('html')[0].innerHTML = '';
  });

  it('should render properly', () => {
    const { getByText } = render(<Comment {...mockDefaultProps} />);
    expect(getByText(mockDefaultProps.posterName)).toBeInTheDocument();
  });

  it('should render seller badge and pin buttons', () => {
    const { getByLabelText, getByTestId } = render(
      <Comment {...mockIsSellerProps} />,
    );
    expect(getByTestId('TEST_BADGE')).toBeInTheDocument();
    expect(
      getByLabelText(`${mockIsSellerProps.commentID}-pin-button`),
    ).toBeInTheDocument();
  });

  it('should render the new updated date', () => {
    const { getByText } = render(<Comment {...mockModifiedDateProps} />);
    expect(getByText('(Updated, 25 Feb 2022)')).toBeInTheDocument();
  });

  test('renders changes for pin and unpin states', async () => {
    const { getByLabelText } = render(<Comment {...mockIsSellerProps} />);

    updateComment.mockResolvedValue({
      data: {},
      status: 200,
    });

    await act(async () => {
      fireEvent.click(
        getByLabelText(`${mockIsSellerProps.commentID}-pin-button`),
        { bubbles: true },
      );
    });

    expect(
      getByLabelText(`${mockIsSellerProps.commentID}-unpin-button`),
    ).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(
        getByLabelText(`${mockIsSellerProps.commentID}-unpin-button`),
        { bubbles: true },
      );
    });

    expect(
      getByLabelText(`${mockIsSellerProps.commentID}-pin-button`),
    ).toBeInTheDocument();
  });

  test('saves comment and renders the updated comment', async () => {
    const { getByLabelText, getByText, queryByText } = render(
      <Comment {...mockIsEditableProps} />,
    );

    updateComment.mockResolvedValue({
      data: {},
      status: 200,
    });

    expect(queryByText('new text')).toBeFalsy();

    await act(async () => {
      // Click the edit button
      fireEvent.click(
        getByLabelText(`${mockIsEditableProps.commentID}-edit-button`),
        { bubbles: true },
      );
    });

    await act(async () => {
      // Change the textarea
      fireEvent.change(
        getByLabelText(`${mockIsEditableProps.commentID}-edit-textarea`),
        { target: { value: 'new text' } },
      );
    });

    await act(async () => {
      // Click the save button
      fireEvent.click(
        getByLabelText(`${mockIsEditableProps.commentID}-save-button`),
        { bubbles: true },
      );
    });

    // expect the new text
    expect(getByText('new text')).toBeInTheDocument();
  });

  test('discards comment and renders the original comment', () => {
    const { getByLabelText, getByText, queryByText } = render(
      <Comment {...mockIsEditableProps} />,
    );

    // Click the edit button
    fireEvent.click(
      getByLabelText(`${mockIsEditableProps.commentID}-edit-button`),
      { bubbles: true },
    );

    // Change the textarea
    fireEvent.change(
      getByLabelText(`${mockIsEditableProps.commentID}-edit-textarea`),
      { target: { value: 'new text' } },
    );

    // Click the discard button
    fireEvent.click(
      getByLabelText(`${mockIsEditableProps.commentID}-discard-button`),
      { bubbles: true },
    );

    // expect the new text
    expect(queryByText('new text')).toBeFalsy();
    expect(getByText(mockIsEditableProps.comment)).toBeInTheDocument();
  });

  test('saving empty comment should not be accepted', () => {
    const { getByLabelText, queryByText } = render(
      <Comment {...mockIsEditableProps} />,
    );

    // Click the edit button
    fireEvent.click(
      getByLabelText(`${mockIsEditableProps.commentID}-edit-button`),
      { bubbles: true },
    );

    // Change the textarea
    fireEvent.change(
      getByLabelText(`${mockIsEditableProps.commentID}-edit-textarea`),
      { target: { value: '' } },
    );

    // Click the save button
    fireEvent.click(
      getByLabelText(`${mockIsEditableProps.commentID}-save-button`),
      { bubbles: true },
    );

    // expect the editting buttons to still exist
    expect(queryByText(mockIsEditableProps.comment)).toBeFalsy();
    expect(
      getByLabelText(`${mockIsEditableProps.commentID}-discard-button`),
    ).toBeInTheDocument();
    expect(
      getByLabelText(`${mockIsEditableProps.commentID}-save-button`),
    ).toBeInTheDocument();
  });

  test('successfully deleted a comment', async () => {
    deleteCommentById.mockResolvedValue({
      data: {},
      status: 200,
    });

    const { getByLabelText } = render(<Comment {...mockIsEditableProps} />);

    // Click the edit button
    fireEvent.click(
      getByLabelText(`${mockIsEditableProps.commentID}-edit-button`),
      { bubbles: true },
    );

    // Click the save button
    await act(async () => {
      fireEvent.click(
        getByLabelText(`${mockIsEditableProps.commentID}-delete-button`),
        { bubbles: true },
      );
    });

    expect(mockRouterReload).toHaveBeenCalled();
  });

  test('failed to delete a comment', async () => {
    deleteCommentById.mockResolvedValue({
      error: {},
      status: 400,
    });

    const { getByLabelText } = render(<Comment {...mockIsEditableProps} />);

    // Click the edit button
    fireEvent.click(
      getByLabelText(`${mockIsEditableProps.commentID}-edit-button`),
      { bubbles: true },
    );

    // Click the save button
    await act(async () => {
      fireEvent.click(
        getByLabelText(`${mockIsEditableProps.commentID}-delete-button`),
        { bubbles: true },
      );
    });

    expect(mockRouterReload).toHaveBeenCalledTimes(0);
  });

  it('should render reply correctly', () => {
    const replyComponent = <Comment {...mockReplyProps} />;
    const { getByText } = render(
      <Comment {...mockIsSellerProps} reply={replyComponent} />,
    );
    expect(getByText(mockReplyProps.comment)).toBeInTheDocument();
  });

  it('should open CommentForm if reply button is clicked', async () => {
    const { getByLabelText, getByText } = render(
      <Comment {...mockIsSellerProps} />,
    );

    // Click the reply button
    await act(async () => {
      fireEvent.click(
        getByLabelText(`${mockIsSellerProps.commentID}-reply-button`),
        { bubbles: true },
      );
    });

    expect(getByText('Reply as seller')).toBeInTheDocument();
  });

  it('should execute deleteCommentReplyById when deleting reply', async () => {
    deleteCommentReplyById.mockResolvedValue({
      data: {},
      status: 200,
    });

    const { getByLabelText } = render(
      <Comment {...mockReplyProps} />,
    );

    // Click the edit button
    await act(async () => {
      fireEvent.click(
        getByLabelText(`${mockReplyProps.commentID}-edit-button`),
        { bubbles: true },
      );
    });

    // Click the delete button
    await act(async () => {
      fireEvent.click(
        getByLabelText(`${mockReplyProps.commentID}-delete-button`),
        { bubbles: true },
      );
    });

    expect(deleteCommentReplyById).toHaveBeenCalled();
  });
});

import {
  render, fireEvent, act,
} from '@testing-library/react';
import { updateComment } from '../../server/api';

import Comment from './Comment';

jest.mock('../../server/api', () => ({
  updateComment: jest.fn(),
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

const mockIsSellerProps = {
  commentID: 2,
  posterName: 'John Doe',
  comment:
    'Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  isSeller: true,
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
});

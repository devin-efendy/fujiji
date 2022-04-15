import React from 'react';
import Comment from './Comment';

export default {
  title: 'Comment',
  component: Comment,
};

function Template({ ...args }) {
  return <Comment {...args} />;
}

export const Default = Template.bind({});
Default.args = {
  commentID: 1,
  posterName: 'John Doe',
  comment:
    'Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
  isSeller: false,
  isEditable: false,
  isHighlighted: false,
  commentDate: '2022-02-21',
};

export const Seller = Template.bind({});
Seller.args = {
  commentID: 2,
  posterName: 'John Doe',
  comment:
    'Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  isSeller: true,
  isEditable: false,
  isHighlighted: false,
  commentDate: '2022-02-21',
};

export const SellerOptions = Template.bind({});
SellerOptions.args = {
  commentID: 2,
  posterName: 'John Doe',
  comment:
    'Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  isSeller: false,
  showSellerOptions: true,
  isEditable: false,
  isHighlighted: false,
  commentDate: '2022-02-21',
};

export const Editable = Template.bind({});
Editable.args = {
  commentID: 3,
  posterName: 'John Doe',
  comment:
    'Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  isSeller: true,
  isEditable: true,
  isHighlighted: false,
  commentDate: '2022-02-21',
};

export const Highlighted = Template.bind({});
Highlighted.args = {
  commentID: 4,
  posterName: 'John Doe',
  comment:
    'Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  isSeller: false,
  isEditable: false,
  isHighlighted: true,
  commentDate: '2022-02-21',
};

export const SellerAndHighlighted = Template.bind({});
SellerAndHighlighted.args = {
  commentID: 5,
  posterName: 'John Doe',
  comment:
    'Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  isSeller: true,
  isEditable: false,
  isHighlighted: true,
  commentDate: '2022-02-21',
};

export const Modified = Template.bind({});
Modified.args = {
  commentID: 6,
  posterName: 'John Doe',
  comment:
    'Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  isSeller: false,
  isEditable: true,
  isHighlighted: false,
  commentDate: '2022-02-21',
  modifiedDate: '2022-02-21',
};

function ReplyStory({ ...args }) {
  const reply = <Comment {...args.reply} />;
  return <Comment {...args.comment} reply={reply} />;
}

export const Reply = ReplyStory.bind({});
Reply.args = {
  comment: {
    commentID: 6,
    posterName: 'John Doe',
    comment:
      'Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    reply:
      'Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    isSeller: false,
    showSellerOptions: true,
    isEditable: false,
    isHighlighted: false,
    commentDate: '2022-02-21',
    modifiedDate: undefined,
  },
  reply: {
    commentID: 6,
    posterName: 'The Seller',
    comment:
      'Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    isSeller: true,
    showSellerOptions: false,
    isEditable: true,
    isHighlighted: false,
    commentDate: '2022-02-21',
    modifiedDate: undefined,
  },
};

function CommentsChainStory({ ...args }) {
  return (
    <div>
      <Comment {...args[0]} />
      <Comment {...args[1]} />
      <Comment {...args[2]} />
      <Comment {...args[3]} />
      <Comment {...args[4]} />
    </div>
  );
}

export const CommentsChain = CommentsChainStory.bind({});
CommentsChain.args = [
  {
    commentID: 1,
    posterName: 'All State',
    comment:
      'Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    isSeller: true,
    showSellerOptions: true,
    isEditable: true,
    isHighlighted: true,
    commentDate: '2022-02-21',
    modifiedDate: '2022-02-21',
  },
  {
    commentID: 2,
    posterName: 'John Doe',
    comment:
      'Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    isSeller: false,
    isEditable: false,
    isHighlighted: true,
    commentDate: '2022-02-21',
  },
  {
    commentID: 3,
    posterName: 'The Seller',
    comment:
      'Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    isSeller: true,
    isEditable: false,
    isHighlighted: false,
    commentDate: '2022-02-21',
  },
  {
    commentID: 4,
    posterName: 'Updated Comment',
    comment:
      'Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    isSeller: false,
    isEditable: false,
    isHighlighted: false,
    commentDate: '2022-02-21',
    modifiedDate: '2022-02-21',
  },
  {
    commentID: 5,
    posterName: 'Editable',
    comment:
      'Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    isSeller: false,
    isEditable: true,
    isHighlighted: false,
    commentDate: '2022-02-21',
  },
];

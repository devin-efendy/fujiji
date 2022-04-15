import React from 'react';
import CommentForm from './CommentForm';

export default {
  title: 'CommentForm',
  component: CommentForm,
};

function Template({ ...args }) {
  return <CommentForm {...args} />;
}

export const Default = Template.bind({});
Default.args = {
  userName: 'John Doe',
  onSubmit: () => ({ status: 200 }),
};

export const Reply = Template.bind({});
Reply.args = {
  userName: '',
  isReply: true,
  onSubmit: () => ({ status: 200 }),
};

export const ApiError = Template.bind({});
ApiError.args = {
  userName: 'John Doe',
  onSubmit: () => ({ error: {} }),
};

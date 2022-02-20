import React from 'react';
import PageLayout from './PageLayout';

export default {
  title: 'PageLayout',
  component: PageLayout,
};

function Template({ ...args }) {
  return <PageLayout {...args} />;
}

export const Default = Template.bind({});

Default.args = {
  children: <div>Test Children</div>,
};

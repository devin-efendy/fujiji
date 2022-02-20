import React from 'react';
import Footer from './Footer';

export default {
  title: 'Footer',
  component: Footer,
};

function Template({ ...args }) {
  return <Footer {...args} />;
}

export const Default = Template.bind({});

Default.args = {};

// export const Primary;

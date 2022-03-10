import React from 'react';
import EditProfile from './EditProfile';

export default {
  title: 'EditProfile',
  component: EditProfile,
};

function Template({ ...args }) {
  return <EditProfile {...args} />;
}

export const Default = Template.bind({});

// export const Primary;

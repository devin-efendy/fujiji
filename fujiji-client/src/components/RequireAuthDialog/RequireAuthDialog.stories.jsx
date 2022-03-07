import React from 'react';
import RequireAuthDialog from './RequireAuthDialog';

export default {
  title: 'RequireAuthDialog',
  component: RequireAuthDialog,
};

function Template({ ...args }) {
  return <RequireAuthDialog {...args} />;
}

export const Default = Template.bind({});

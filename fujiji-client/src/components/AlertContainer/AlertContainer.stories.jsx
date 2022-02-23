import { React } from 'react';
import AlertContainer from './AlertContainer';

export default {
  title: 'AlertContainer',
  component: AlertContainer,
};

function Template({ ...args }) {
  return <AlertContainer {...args} />;
}

export const Default = Template.bind({});

Default.args = {
  headerText: 'Header',
  contentText: 'Content',
  confirmButtonText: 'Confirm',
  confirmButtonColor: 'red',
  cancelButtonText: 'Cancel',
  isOpen: false,
};

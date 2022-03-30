import React from 'react';
import { SessionProvider } from '../../context/session';
import EditProfile from './EditProfile';

export default {
  title: 'EditProfile',
  component: EditProfile,
};

function Template({ ...args }) {
  return (
    <SessionProvider
      value={{ userData: { email: 'test@fujiji.com', name: 'Fujiji Admin' } }}
    >
      <EditProfile {...args} />
    </SessionProvider>
  );
}

export const Default = Template.bind({});

// export const Primary;

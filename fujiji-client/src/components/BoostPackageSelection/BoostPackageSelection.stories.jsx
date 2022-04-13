import React from 'react';
import BoostPackageSelection from './BoostPackageSelection';

export default {
  title: 'BoostPackageSelection',
  component: BoostPackageSelection,
};

function Template({ ...args }) {
  return <BoostPackageSelection {...args} />;
}

export const Default = Template.bind({});

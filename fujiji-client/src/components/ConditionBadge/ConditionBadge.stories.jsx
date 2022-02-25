import React from 'react';
import ConditionBadge from './ConditionBadge';

export default {
  title: 'ConditionBadge',
  component: ConditionBadge,
  argTypes: {
    condition: {
      options: ['new', 'used', 'refurbished'],
      control: { type: 'radio' },
    },
  },
};

function Template({ ...args }) {
  return <ConditionBadge {...args} />;
}

export const New = Template.bind({});
New.args = {
  condition: 'new',
};

export const Used = Template.bind({});
Used.args = {
  condition: 'used',
};

export const Refurbished = Template.bind({});
Refurbished.args = {
  condition: 'refurbished',
};

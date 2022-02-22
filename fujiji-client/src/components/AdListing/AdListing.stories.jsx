import React from 'react';
import AdListing from './AdListing';
import mockAdListing from '../../__mocks__/mockAdListing';

export default {
  title: 'AdListing',
  component: AdListing,
  argTypes: {
    condition: {
      options: ['new', 'used'],
      control: { type: 'radio' },
    },
    postingDate: {
      control: { type: 'text' },
      defaultValue: '2022-02-21',
    },
  },
};

function Template({ ...args }) {
  return <AdListing {...args} />;
}

export const NewFurniture = Template.bind({});
NewFurniture.args = {
  ...mockAdListing[0],
};

export const UsedFurniture = Template.bind({});
UsedFurniture.args = {
  ...mockAdListing[1],
};

export const EmptyDescription = Template.bind({});
EmptyDescription.args = {
  ...mockAdListing[2],
};

// export const Primary;

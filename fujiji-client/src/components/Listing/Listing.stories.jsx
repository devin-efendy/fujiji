import React from 'react';
import Listing from './Listing';
import mockAdListing from '../../__mocks__/mockAdListing';

export default {
  title: 'Listing',
  component: Listing,
  argTypes: {
    condition: {
      options: ['new', 'used', 'refurbished'],
      control: { type: 'radio' },
    },
    postingDate: {
      control: { type: 'text' },
      defaultValue: '2022-02-21',
    },
  },
};

function Template({ ...args }) {
  return <Listing {...args} />;
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

export const SellerListing = Template.bind({});
SellerListing.args = {
  isSeller: true,
  ...mockAdListing[0],
};

export const BoostedListing = Template.bind({});
BoostedListing.args = {
  isSeller: true,
  boostDayLeft: 3,
  ...mockAdListing[0],
};

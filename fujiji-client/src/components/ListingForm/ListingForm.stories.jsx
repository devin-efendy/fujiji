import React from 'react';
import ListingForm from './ListingForm';

export default {
  title: 'ListingForm',
  component: ListingForm,
  argTypes: {
    condition: {
      options: ['Brand New', 'Used', 'Refurbished'],
      control: { type: 'select' },
    },
    postingDate: {
      control: { type: 'text' },
      defaultValue: '2022-02-21',
    },
  },
};

function Template({ ...args }) {
  return <ListingForm {...args} />;
}

export const Default = Template.bind({});

Default.args = {
  isUpdate: false,
};

export const Post = Template.bind({});

Post.args = {
  title: 'New Listing',
  description: 'test description',
  condition: 'Brand New',
  city: 'Winnipeg',
  province: 'MB',
  price: 150.02,
  category: 'Chair',
  isUpdate: false,
};

export const Update = Template.bind({});

Update.args = {
  title: 'Plain old chair',
  description: 'test description',
  condition: 'Brand New',
  city: 'Winnipeg',
  province: 'MB',
  imageUrl: 'https://source.unsplash.com/ueJ2oJeEK-U/',
  price: 1900.0,
  category: 'Chair',
  isUpdate: true,
};

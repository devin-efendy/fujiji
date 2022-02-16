import React from 'react';
import AdListing from './AdListing';

export default {
  title: 'AdListing',
  component: AdListing,
};

function Template({ ...args }) {
  return <AdListing {...args} />;
}

export const Default = Template.bind({});

Default.args = {
  imageUrl: 'https://bit.ly/2Z4KKcF',
  imageAlt: 'Rear view of modern home with pool',
  beds: 3,
  baths: 2,
  title: 'Modern home in city center in the heart of historic Los Angeles',
  formattedPrice: '$1,900.00',
  reviewCount: 34,
  rating: 4,
};

// export const Primary;

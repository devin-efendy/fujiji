import axios from 'axios';
import getConfig from 'next/config';

export default async function getListingById(listingId) {
  try {
    const { publicRuntimeConfig } = getConfig();
    const result = await axios.get(
      `${publicRuntimeConfig.FUJIJI_API_URL}/listing/${listingId}`,
    );
    const { listing } = result.data;

    const { data } = await axios.get(
      `${publicRuntimeConfig.FUJIJI_API_URL}/user/${listing.user_id}`,
    );

    return {
      userID: parseInt(listing.user_id, 10),
      listingID: parseInt(listing.listing_id, 10),
      sellerName: data.user.name,
      title: listing.title,
      condition: listing.condition,
      category: listing.category,
      city: listing.city,
      province: listing.province_code,
      imageUrl: listing.image_url,
      price: listing.price,
      description: listing.description,
      postingDate: listing.creation_date,
      contactEmail: listing.contact_email,
      score: parseInt(listing.score, 10),
    };
  } catch (error) {
    if (error.response) {
      const { data, status } = error.response;
      return {
        error: data.error,
        status,
      };
    }
    return {
      error: 'Something went wrong... Check if Fujiji API is running',
      status: 500,
    };
  }
}

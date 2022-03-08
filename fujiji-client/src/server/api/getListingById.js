import axios from 'axios';
import config from '../../../config';

export default async function getListingById(listingId) {
  try {
    const result = await axios.get(
      `${config.FUJIJI_API_URL}/listing/${listingId}`,
    );
    const { listing } = result.data;
    return {
      listingID: parseInt(listing.listing_id, 10),
      title: listing.title,
      condition: listing.condition,
      category: listing.category,
      city: listing.city,
      province: listing.province_code,
      imageUrl: listing.image_url,
      price: listing.price,
      description: listing.description,
      creationDate: listing.creation_date,
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

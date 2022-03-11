import axios from 'axios';
import { format } from 'date-fns';
import config from '../../../config';

export default async function getAllListings() {
  try {
    const result = await axios.get(
      `${config.FUJIJI_API_URL}/listing`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    const { listings } = result.data;

    return listings.map((listing) => {
      const formattedDate = format(
        new Date(listing.creation_date),
        'yyyy-MM-dd',
      );

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
        postingDate: formattedDate,
      };
    });
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

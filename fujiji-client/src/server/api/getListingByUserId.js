import axios from 'axios';
import { format } from 'date-fns';
import getConfig from 'next/config';

export default async function getListingByUserId(userId, authToken) {
  try {
    const { publicRuntimeConfig } = getConfig();
    const result = await axios.get(
      `${publicRuntimeConfig.FUJIJI_API_URL}/user/${userId}/listings`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${authToken}`,
        },
      },
    );
    const { userListings } = result.data;

    return userListings.map((listing) => {
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
        isBoosted: parseInt(listing.score, 10) > 0,
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

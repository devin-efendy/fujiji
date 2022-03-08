import axios from 'axios';
import config from '../../../config';

export default async function deleteListingById(listingId, authToken) {
  try {
    const result = await axios.delete(
      `${config.FUJIJI_API_URL}/listing/${listingId}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    );
    return result;
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

import axios from 'axios';
import getConfig from 'next/config';

export default async function postBoost({ listingID, packageID, authToken }) {
  try {
    const { publicRuntimeConfig } = getConfig();
    const result = await axios.post(
      `${publicRuntimeConfig.FUJIJI_API_URL}/boost/${listingID}?packageID=${packageID}`,
      {
        params: {
          packageID,
        },
      },
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

import axios from 'axios';
import getConfig from 'next/config';

export default async function deleteListingById(commentId, authToken) {
  try {
    const { publicRuntimeConfig } = getConfig();
    const result = await axios.delete(
      `${publicRuntimeConfig.FUJIJI_API_URL}/comment/${commentId}`,
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

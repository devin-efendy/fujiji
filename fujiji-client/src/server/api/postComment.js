import axios from 'axios';
import getConfig from 'next/config';
import getQueryString from '../../utils/getQueryString';

export default async function postComment({
  listingID,
  comment,
  authToken,
}) {
  const queryString = getQueryString({
    comment,
  });

  try {
    const { publicRuntimeConfig } = getConfig();
    const result = await axios.post(
      `${publicRuntimeConfig.FUJIJI_API_URL}/comment/${listingID}`,
      queryString,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
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

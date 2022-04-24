import axios from 'axios';
import getConfig from 'next/config';
import getQueryString from '../../utils/getQueryString';

export default async function postConversation({
  senderID,
  receiverID,
  listingID,
  authToken,
}) {
  const queryString = getQueryString({
    senderID,
    receiverID,
    listingID,
  });

  try {
    const { publicRuntimeConfig } = getConfig();
    const response1 = await axios.post(
      `${publicRuntimeConfig.FUJIJI_API_URL}/conversation`,
      queryString,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${authToken}`,
        },
      },
    );

    return response1.data.id;
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

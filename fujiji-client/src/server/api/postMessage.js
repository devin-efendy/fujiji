import axios from 'axios';
import getConfig from 'next/config';
import getQueryString from '../../utils/getQueryString';

export default async function postMessage({
  senderID,
  conversationID,
  message,
  authToken,
}) {
  const queryString = getQueryString({
    senderID,
    conversationID,
    message,
  });

  try {
    const { publicRuntimeConfig } = getConfig();
    const response = await axios.post(
      `${publicRuntimeConfig.FUJIJI_API_URL}/message`,
      queryString,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${authToken}`,
        },
      },
    );

    const result = {
      conversationID: parseInt(response.data.message.conversation_id, 10),
      senderID: parseInt(response.data.message.sender_id, 10),
      message: response.data.message.message,

    };

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

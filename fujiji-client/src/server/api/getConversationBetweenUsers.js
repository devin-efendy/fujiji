import axios from 'axios';
import getConfig from 'next/config';

export default async function getConversationsBetweenUsers(senderID, receiverID, listingID, authToken) {
  try {
    const { publicRuntimeConfig } = getConfig();
    const result = await axios.get(
      `${publicRuntimeConfig.FUJIJI_API_URL}/conversation/listing/${listingID}?senderID=${senderID}&receiverID=${receiverID}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${authToken}`,
        },
      },
    );
    const { conversationID } = result.data;

    return conversationID.conversation_id;
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

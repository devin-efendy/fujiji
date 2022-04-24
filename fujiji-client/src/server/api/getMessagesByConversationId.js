import axios from 'axios';
import getConfig from 'next/config';

export default async function getMessagesByConversationId(conversationID, authToken) {
  try {
    const { publicRuntimeConfig } = getConfig();
    const result = await axios.get(
      `${publicRuntimeConfig.FUJIJI_API_URL}/message/${conversationID}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${authToken}`,
        },
      },
    );
    const { messages } = result.data;

    return messages.map((message) => ({
      conversationID: parseInt(message.conversation_id, 10),
      senderID: parseInt(message.sender_id, 10),
      message: message.message,
    }));
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

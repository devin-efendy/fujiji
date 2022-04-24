import axios from 'axios';
import getConfig from 'next/config';

export default async function getConversationsByConversationId(conversationId, authToken) {
  try {
    const { publicRuntimeConfig } = getConfig();
    const result = await axios.get(
      `${publicRuntimeConfig.FUJIJI_API_URL}/conversation/${conversationId}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${authToken}`,
        },
      },
    );
    const { conversations } = result.data;

    return conversations.map((conversation) => ({
      conversationID: parseInt(conversation.conversation_id, 10),
      senderID: parseInt(conversation.sender_id, 10),
      receiverID: parseInt(conversation.receiver_id, 10),
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

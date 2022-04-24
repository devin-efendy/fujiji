import {
  Box, Center, SimpleGrid, Text, Spinner,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { AdConversationCard, withSession } from '../../../components';
import { useSession } from '../../../context/session';
import { getConversationsByUserId } from '../../../server/api';

function ChatPage() {
  const { userData, authToken } = useSession();
  const [conversations, setConversations] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // for this page we are using client-side rendering
  // so we can show loading indicator when fetching huge list of listings
  useEffect(() => {
    async function fetchData() {
      const res = await getConversationsByUserId(userData.userID, authToken);
      if (res.error) {
        setErrorMessage(res.error);
      } else {
        setConversations(res);
      }
    }

    fetchData();
  }, [userData, authToken]);

  let renderConversations;

  if (conversations.length > 0) {
    // There are listings that exist for this user
    const listOfConversations = conversations.map((conversation) => (
      <Box id={`listing=${conversation.listingID}`} key={conversation.listingID}>
        <AdConversationCard {...conversation} userID={userData?.userID} />
      </Box>
    ));

    renderConversations = (
      <SimpleGrid
        id="userConversationContent"
        columns={[1, 2, null, null, 3]}
        spacing="10"
      >
        {listOfConversations}
      </SimpleGrid>
    );
  } else if (errorMessage) {
    // User does not have any listings yet
    renderConversations = <Text>{errorMessage}</Text>;
  } else {
    // Loading indicator while fetching
    renderConversations = (
      <Center>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="lg"
          mr="4"
        />
        <Text id="testId">We are getting your conversations...</Text>
      </Center>
    );
  }

  return (
    <Center px="1" py="6" flexDir="column">
      <Text fontSize="36px" fontWeight="bold" mb="6">
        Conversations
      </Text>
      {renderConversations}
    </Center>
  );
}

export default withSession(ChatPage);

ChatPage.propTypes = {
  conversationss: PropTypes.arrayOf({
    listingID: PropTypes.number,
    title: PropTypes.string,
    imageUrl: PropTypes.string,
    conversationID: PropTypes.number,
  }),
};

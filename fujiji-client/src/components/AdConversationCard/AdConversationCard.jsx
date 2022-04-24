import PropTypes from 'prop-types';
import {
  AspectRatio, Box, Image, Button, Text,
} from '@chakra-ui/react';
import { ChatIcon, ViewIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';

export default function AdConversationCard({
  imageUrl,
  title,
  listingID,
  conversationID,
  userID,
  listingUserID,
}) {
  const router = useRouter();

  const goToConversation = () => {
    router.push(`/conversation/${conversationID}`);
  };

  const goToAd = () => {
    router.push(`/listing/${listingID}`);
  };

  const isSeller = () => (typeof window === 'undefined'
    ? false
    : parseInt(listingUserID, 10)
          === parseInt(userID, 10));

  return (
    <Box
      as="button"
      w="xs"
      borderWidth="1px"
      rounded="lg"
      _hover={{ boxShadow: 'lg' }}
    >
      <AspectRatio ratio={4 / 3}>
        <Image src={imageUrl} roundedTop="md" />
      </AspectRatio>
      <Box p="6" pb="5" d="flex" flexDirection="column" height="180px">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          {isSeller() && (
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            textTransform="uppercase"
            fontSize="xs"
            display="flex"
            alignItems="center"
          >
            <ArrowForwardIcon />
            <Text ml={2} color="teal">Your Advertisment</Text>
          </Box>
          )}
        </Box>
        <Box
          mt="3"
          fontWeight="Bold"
          lineHeight="tight"
          textAlign="left"
          fontSize="lg"
          noOfLines={1}
        >
          {title}
        </Box>

        <Box
          mt="auto"
          d="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Button colorScheme="teal" onClick={goToAd}>
              <ViewIcon />
&nbsp;View Ad
            </Button>
          </Box>
          <Box
            textAlign="right"
            fontSize="lg"
            fontWeight="semibold"
            color="teal.600"
          >
            <Button colorScheme="teal" onClick={goToConversation}>
              <ChatIcon />
&nbsp;Go to Chat
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

AdConversationCard.propTypes = {
  imageUrl: PropTypes.string,
  title: PropTypes.string,
  listingID: PropTypes.number,
  conversationID: PropTypes.number,
  userID: PropTypes.number,
  listingUserID: PropTypes.number,
};

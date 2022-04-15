import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Textarea,
  Flex,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useSession } from '../../context/session';

export default function CommentForm({
  listingID,
  commentID,
  userName,
  onSubmit,
  isReply,
}) {
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const { authToken } = useSession();
  const toast = useToast();

  return (
    <Flex>
      <FormControl isInvalid={errorMessage !== ''}>
        <Text mb="1" fontSize="md">
          {isReply ? 'Reply as seller' : 'Comment as '}
          <Text d="inline" fontWeight="semibold" color="teal">
            {userName}
          </Text>
        </Text>
        <Textarea
          mt="1"
          aria-label={isReply ? 'reply-input' : 'comment-input'}
          value={comment}
          onChange={(e) => {
            setErrorMessage('');
            setComment(e.target.value);
          }}
          placeholder="Write your comment"
          isInvalid={errorMessage !== ''}
        />
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
        <Box mt="2">
          <Button
            aria-label={
              isReply ? 'submit-reply-button' : 'submit-comment-button'
            }
            size="sm"
            float="right"
            colorScheme="teal"
            variant="solid"
            onClick={async () => {
              if (!comment) {
                setErrorMessage("comment can't be empty");
                return;
              }

              const payload = isReply
                ? { commentID, reply: comment, authToken }
                : {
                  comment,
                  listingID,
                  authToken,
                };

              const response = await onSubmit(payload);

              if (response.error) {
                setErrorMessage('Oops! Something went wrong...');
              } else {
                setComment('');
                toast({
                  id: 'submit-comment-success-toast',
                  title: 'Successfully submit a comment!',
                  status: 'success',
                  duration: 9000,
                  isClosable: true,
                });
                router.reload(window.location.pathname);
              }
            }}
          >
            {isReply ? 'Reply' : 'Comment'}
          </Button>
        </Box>
      </FormControl>
    </Flex>
  );
}

CommentForm.propTypes = {
  listingID: PropTypes.number,
  commentID: PropTypes.number,
  userName: PropTypes.string,
  onSubmit: PropTypes.func,
  isReply: PropTypes.bool,
};

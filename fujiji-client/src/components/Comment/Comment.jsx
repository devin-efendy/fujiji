import {
  Box,
  Button,
  Badge,
  Flex,
  Divider,
  Text,
  Icon,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import {
  CheckIcon,
  DeleteIcon,
  EditIcon,
  CloseIcon,
  ChatIcon,
} from '@chakra-ui/icons';
import { BsFillPinAngleFill } from 'react-icons/bs';
import { format, isValid, parse } from 'date-fns';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  deleteCommentById,
  deleteCommentReplyById,
  replyComment,
  updateComment,
} from '../../server/api';
import { useSession } from '../../context/session';
import CommentForm from '../CommentForm/CommentForm';

export default function Comment({
  commentID = undefined,
  posterName,
  comment,
  isReply,
  reply = undefined,
  isSeller,
  isEditable,
  showSellerOptions,
  isHighlighted,
  commentDate,
  modifiedDate,
}) {
  const toast = useToast();
  const router = useRouter();
  const { authToken } = useSession();

  const [editCommentText, setEdittedComment] = useState(comment);
  const [commentText, saveCommentText] = useState(comment);
  const [isEditting, setEditting] = useState(false);
  const [isPinned, setPinned] = useState(isHighlighted);
  const [editErrorMsg, setEditErrorMsg] = useState('');
  const [showReplyInput, setShowReplyInput] = useState(false);
  const parsedDate = parse(commentDate, 'yyyy-MM-dd', new Date());

  const formattedDate = isValid(parsedDate)
    ? format(new Date(parsedDate), 'dd MMM yyyy')
    : '';

  const parsedModifiedDate = parse(modifiedDate, 'yyyy-MM-dd', new Date());
  const formattedModifiedDate = isValid(parsedModifiedDate)
    ? format(new Date(parsedModifiedDate), 'dd MMM yyyy')
    : '';

  const renderComment = isEditting ? (
    <Textarea
      aria-label={`${commentID}-edit-textarea`}
      mt="2"
      resize="vertical"
      onChange={(e) => setEdittedComment(e.target.value)}
      isInvalid={!!editErrorMsg}
      value={editCommentText}
    />
  ) : (
    <Text mt="2">{commentText}</Text>
  );

  const EdittingButtonGroup = (
    <Flex ml="3">
      <Button
        aria-label={`${commentID}-save-button`}
        leftIcon={<CheckIcon />}
        colorScheme="teal"
        variant="link"
        size="sm"
        onClick={async () => {
          if (editCommentText === '') {
            setEditErrorMsg("Comment can't be empty");
            return;
          }

          const payload = isReply
            ? { commentID, reply: editCommentText, authToken }
            : {
              commentID,
              comment: editCommentText,
              isHighlighted: isPinned ? 1 : 0,
              authToken,
            };

          const apiReq = isReply ? replyComment : updateComment;

          const saveRes = await apiReq(payload);

          if (!saveRes.error) {
            saveCommentText(editCommentText);
            setEditting(!isEditting);
            router.reload(window.location.pathname);
          } else {
            toast({
              title: 'Oops! Something went wrong...',
              status: 'error',
              duration: 9000,
              isClosable: true,
            });
          }
        }}
      >
        save
      </Button>
      <Button
        aria-label={`${commentID}-discard-button`}
        ml="3"
        leftIcon={<CloseIcon />}
        colorScheme="gray"
        variant="link"
        size="sm"
        onClick={() => {
          setEditErrorMsg('');
          setEdittedComment(commentText);
          setEditting(!isEditting);
        }}
      >
        discard
      </Button>
      <Button
        aria-label={`${commentID}-delete-button`}
        ml="3"
        leftIcon={<DeleteIcon />}
        colorScheme="red"
        variant="link"
        size="sm"
        onClick={async () => {
          let res;
          if (isReply) {
            res = await deleteCommentReplyById(commentID, authToken);
          } else {
            res = await deleteCommentById(commentID, authToken);
          }
          if (res.error) {
            toast({
              id: 'comment-delete-failure-toast',
              title: 'Oops! Something went wrong...',
              status: 'error',
              duration: 9000,
              isClosable: true,
            });
          } else {
            router.reload(window.location.pathname);
            toast({
              id: 'comment-deleted-toast',
              title: 'Comment is deleted',
              status: 'error',
              duration: 9000,
              isClosable: true,
            });
          }
        }}
      >
        delete
      </Button>
    </Flex>
  );

  const EditButtonGroup = isEditting ? (
    EdittingButtonGroup
  ) : (
    <Button
      aria-label={`${commentID}-edit-button`}
      leftIcon={<EditIcon />}
      colorScheme="teal"
      variant="link"
      size="sm"
      onClick={() => {
        setEditErrorMsg('');
        setEditting(!isEditting);
      }}
    >
      edit
    </Button>
  );

  const ReplyButton = (
    <Button
      aria-label={`${commentID}-reply-button`}
      ml="3"
      leftIcon={<ChatIcon />}
      colorScheme="gray"
      variant="link"
      size="sm"
      onClick={() => {
        setShowReplyInput(!showReplyInput);
      }}
    >
      reply
    </Button>
  );

  return (
    <Flex id={`comment-${commentID}`} flexDir="column">
      <Divider />
      <Box p="3" bg={isPinned ? 'yellow.50' : 'none'}>
        <Flex alignItems="center">
          {isPinned && (
            <Icon
              id={`${comment}-pinned-icon`}
              mr="3"
              as={BsFillPinAngleFill}
              color="teal"
            />
          )}
          <Text fontWeight="bold" mr="3">
            {posterName}
          </Text>

          {isSeller && (
            <Badge
              borderRadius="full"
              px="2"
              colorScheme="teal"
              data-testid="TEST_BADGE"
            >
              seller
            </Badge>
          )}
          {showSellerOptions && !isPinned && (
            <Button
              aria-label={`${commentID}-pin-button`}
              ml="3"
              leftIcon={<Icon as={BsFillPinAngleFill} color="gray.400" />}
              color="gray.400"
              variant="link"
              size="sm"
              onClick={async () => {
                const putRes = await updateComment({
                  commentID,
                  comment: commentText,
                  isHighlighted: 1,
                  authToken,
                });

                if (!putRes.error) {
                  setPinned(!isPinned);
                } else {
                  toast({
                    title: 'Oops! Something went wrong...',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                  });
                }
              }}
            >
              pin
            </Button>
          )}
          {showSellerOptions && isPinned && (
            <Button
              aria-label={`${commentID}-unpin-button`}
              ml="3"
              color="gray.400"
              variant="link"
              size="sm"
              onClick={async () => {
                const putRes = await updateComment({
                  commentID,
                  comment: commentText,
                  isHighlighted: 0,
                  authToken,
                });

                if (!putRes.error) {
                  setPinned(!isPinned);
                } else {
                  toast({
                    title: 'Oops! Something went wrong...',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                  });
                }
              }}
            >
              unpin
            </Button>
          )}
        </Flex>
        {renderComment}
        <Flex mt="4">
          {!isReply && (
            <Text
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              textTransform="uppercase"
              fontSize="xs"
              mr="3"
            >
              {formattedModifiedDate && `(Updated, ${formattedModifiedDate})`}
              {!formattedModifiedDate && `Posted on, ${formattedDate}`}
            </Text>
          )}

          {isEditable && EditButtonGroup}
          {!reply && showSellerOptions && ReplyButton}
        </Flex>
      </Box>
      {showReplyInput && (
        <Box ml="10">
          <CommentForm
            isReply
            commentID={commentID}
            onSubmit={replyComment}
          />
        </Box>
      )}
      {reply && <Box ml="10">{reply}</Box>}
    </Flex>
  );
}

Comment.propTypes = {
  commentID: PropTypes.number,
  posterName: PropTypes.string,
  comment: PropTypes.string,
  isReply: PropTypes.bool,
  reply: PropTypes.elementType,
  isSeller: PropTypes.bool,
  showSellerOptions: PropTypes.bool,
  isEditable: PropTypes.bool,
  isHighlighted: PropTypes.bool,
  commentDate: PropTypes.string,
  modifiedDate: PropTypes.string,
};

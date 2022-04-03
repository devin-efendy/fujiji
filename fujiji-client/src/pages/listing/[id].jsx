import {
  Box, Center, Divider, Flex, Link, Text,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Comment, CommentForm, Listing } from '../../components';
import { useSession } from '../../context/session';
import {
  getListingById,
  getCommentsByListingId,
  postComment,
} from '../../server/api';

const signInHelper = (
  /* eslint-disable react/no-unescaped-entities */
  <Text>
    You need to
    {' '}
    <Link href="/signin" color="teal.500">
      Sign In
      {' '}
    </Link>
    to post a comment. Don't have an account?
    {' '}
    <Link href="/signup" color="teal.500">
      Sign Up
    </Link>
    .
  </Text>
);

function ListingComments({
  comments,
  userID = undefined,
  sellerID = undefined,
}) {
  if (!comments || comments.length === 0 || comments.error) {
    return null;
  }

  const isHighlightable = parseInt(userID, 10) === parseInt(sellerID, 10);

  return comments.map((comment) => {
    const commentProps = {
      ...comment,
      isHighlightable,
      isEditable: userID
        ? parseInt(userID, 10) === parseInt(comment.userID, 10)
        : false,
    };

    return (
      <Box key={`comment-${comment.commentID}`}>
        <Comment {...commentProps} />
      </Box>
    );
  });
}

function IndividualListingPage({ listingData, commentsData }) {
  const session = useSession();
  const [listingComments, setListingComments] = useState(
    !commentsData.error || commentsData.length !== 0 ? commentsData : [],
  );

  if (typeof window === 'undefined') {
    return null;
  }

  if (listingData.error) {
    return <Center>{listingData.error}</Center>;
  }

  const listingProps = {
    ...listingData,
    isSeller:
      typeof window === 'undefined'
        ? false
        : parseInt(listingData.userID, 10)
          === parseInt(session.userData?.userID, 10),
  };

  const handleSubmitComment = async (payload) => {
    const postCommentRes = await postComment(payload);
    if (!postCommentRes.error) {
      const getCommentsRes = await getCommentsByListingId(
        listingData.listingID,
      );
      setListingComments(getCommentsRes);
    }
    return postCommentRes;
  };

  const renderCommentForm = session.userData ? (
    <CommentForm
      listingID={listingData.listingID}
      userName={session.userData?.name}
      onSubmit={handleSubmitComment}
    />
  ) : (
    signInHelper
  );

  return (
    <Center id={`listingContainer-${listingData.listingID}`} px="1" py="6">
      <Flex flexDir="column">
        <Listing {...listingProps} />

        <Box mt="6" p="3">
          <Divider mb="3" />
          {renderCommentForm}
        </Box>
        <Box mt="6" w="100%">
          {ListingComments({
            comments: listingComments,
            userID: session.userData?.userID,
            sellerID: listingData.userID,
          })}
        </Box>
      </Flex>
    </Center>
  );
}

export default IndividualListingPage;

export async function getServerSideProps(context) {
  const listingId = context.query.id;

  const listingData = await getListingById(listingId);
  const commentsData = await getCommentsByListingId(listingId);

  return {
    props: {
      listingData,
      commentsData,
    },
  };
}

IndividualListingPage.propTypes = {
  listingData: PropTypes.shape({
    userID: PropTypes.number,
    listingID: PropTypes.number,
    title: PropTypes.string,
    condition: PropTypes.string,
    category: PropTypes.string,
    city: PropTypes.string,
    province: PropTypes.string,
    imageUrl: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
    creationDate: PropTypes.string,
    contactEmail: PropTypes.string,
    error: PropTypes.string,
  }),
  commentsData: PropTypes.arrayOf(
    PropTypes.shape({
      commentID: PropTypes.number,
      userID: PropTypes.number,
      posterName: PropTypes.string,
      comment: PropTypes.string,
      isHighlighted: PropTypes.bool,
      isSeller: PropTypes.bool,
      commentDate: PropTypes.string,
      modifiedDate: PropTypes.string,
    }),
  ),
};

ListingComments.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      commentID: PropTypes.number,
      userID: PropTypes.number,
      posterName: PropTypes.string,
      comment: PropTypes.string,
      isHighlighted: PropTypes.bool,
      isSeller: PropTypes.bool,
      commentDate: PropTypes.string,
      modifiedDate: PropTypes.string,
    }),
  ),
  userID: PropTypes.number,
  sellerID: PropTypes.number,
};

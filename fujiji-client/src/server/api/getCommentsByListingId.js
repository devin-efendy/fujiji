import axios from 'axios';
import { format } from 'date-fns';
import getConfig from 'next/config';

export default async function getCommentsByListingId(listingID) {
  try {
    const { publicRuntimeConfig } = getConfig();
    const result = await axios.get(
      `${publicRuntimeConfig.FUJIJI_API_URL}/comment/${listingID}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    const { comments } = result.data;

    return comments.map((commentObj) => {
      const formattedDate = format(
        new Date(commentObj.creation_date),
        'yyyy-MM-dd',
      );

      const formattedModifiedDate = commentObj.modified_date
        ? format(new Date(commentObj.modified_date), 'yyyy-MM-dd')
        : null;

      return {
        commentID: parseInt(commentObj.comment_id, 10),
        userID: parseInt(commentObj.user_id, 10),
        posterName: commentObj.name,
        comment: commentObj.comment,
        isHighlighted: commentObj.isHighlighted === 1,
        isSeller: commentObj.isAuthor === 1,
        commentDate: formattedDate,
        modifiedDate: formattedModifiedDate,
        reply: commentObj.reply,
      };
    });
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

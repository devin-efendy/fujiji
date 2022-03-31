import { Center } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { Listing } from '../../components';
import { useSession } from '../../context/session';
import { getListingById } from '../../server/api';

function IndividualListingPage({ data }) {
  const session = useSession();

  if (typeof window === 'undefined') {
    return null;
  }

  if (data.error) {
    return <Center>{data.error}</Center>;
  }

  const listingProps = {
    ...data,
    isSeller:
      typeof window === 'undefined'
        ? false
        : parseInt(data.userID, 10) === parseInt(session.userData?.userID, 10),
  };

  return (
    <Center id={`listingContainer-${data.listingID}`} px="1" py="6">
      <Listing {...listingProps} />
    </Center>
  );
}

export default IndividualListingPage;

export async function getServerSideProps(context) {
  const listingId = context.query.id;

  const data = await getListingById(listingId);

  return {
    props: {
      data,
    },
  };
}

IndividualListingPage.propTypes = {
  data: PropTypes.shape({
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
};

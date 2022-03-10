import { Center } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { Listing, withSession } from '../../components';
import { getListingById } from '../../server/api';

function IndividualListingPage({ data }) {
  if (data.error) {
    return <Center>{data.error}</Center>;
  }

  return (
    <Center id={`listingContainer-${data.listingID}`} px="1" py="6">
      <Listing {...data} />
    </Center>
  );
}

export default withSession(IndividualListingPage);

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

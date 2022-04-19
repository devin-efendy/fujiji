import {
  Box, Center, SimpleGrid, Text, Spinner,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { AdListingCard, withSession } from '../../../components';
import { useSession } from '../../../context/session';
import { getListingByUserId } from '../../../server/api';

function UserListingsPage() {
  const router = useRouter();
  const { userData, authToken } = useSession();
  const [listings, setListings] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // for this page we are using client-side rendering
  // so we can show loading indicator when fetching huge list of listings
  useEffect(() => {
    async function fetchData() {
      const res = await getListingByUserId(userData.userID, authToken);
      if (res.error) {
        setErrorMessage(res.error);
      } else {
        setListings(res);
      }
    }

    fetchData();
  }, [userData, authToken]);

  let renderListings;

  if (listings.length > 0) {
    // There are listings that exist for this user
    const listOfListings = listings.map((listing) => {
      const onSubmit = () => {
        router.push(`/listing/${listing.listingID}`);
      };
      return (
        <Box id={`listing=${listing.listingID}`} key={listing.listingID}>
          <AdListingCard {...listing} onClick={onSubmit} />
        </Box>
      );
    });

    renderListings = (
      <SimpleGrid
        id="userListingsContent"
        columns={[1, 2, null, null, 3]}
        spacing="10"
      >
        {listOfListings}
      </SimpleGrid>
    );
  } else if (errorMessage) {
    // User does not have any listings yet
    renderListings = <Text>{errorMessage}</Text>;
  } else {
    // Loading indicator while fetching
    renderListings = (
      <Center>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="lg"
          mr="4"
        />
        <Text id="testId">We are getting your listings...</Text>
      </Center>
    );
  }

  return (
    <Center px="1" py="6" flexDir="column">
      <Text fontSize="36px" fontWeight="bold" mb="6">
        My Listing
      </Text>
      {renderListings}
    </Center>
  );
}

export default withSession(UserListingsPage);

UserListingsPage.propTypes = {
  listings: PropTypes.arrayOf({
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
    error: PropTypes.string,
    isBoosted: PropTypes.bool,
  }),
};

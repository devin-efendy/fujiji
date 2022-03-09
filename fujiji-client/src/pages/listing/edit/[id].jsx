import { Center } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { ListingForm, withSession } from '../../../components';
import { useSession } from '../../../context/session';
import {
  updateListing,
  deleteListingById,
  getListingById,
} from '../../../server/api';

function EditListingPage({ data }) {
  const router = useRouter();
  const { userData, authToken } = useSession();

  if (data.error) {
    return <Center>{data.error}</Center>;
  }

  const onDelete = async () => {
    const { listingID } = data;
    await deleteListingById(listingID, authToken);
    router.push(`/user/${userData.userID}/listings`);
  };

  return (
    <Center id="listingFormContainer" px="1" py="6">
      <ListingForm
        {...data}
        onSubmit={updateListing}
        onDelete={onDelete}
        isUpdate
      />
    </Center>
  );
}

export default withSession(EditListingPage);

export async function getServerSideProps(context) {
  const listingId = context.query.id;

  const data = await getListingById(listingId);

  return {
    props: {
      data,
    },
  };
}

EditListingPage.propTypes = {
  data: PropTypes.shape({
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
  }),
};

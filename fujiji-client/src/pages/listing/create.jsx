import { Center } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ListingForm, withSession } from '../../components';
import { postListing } from '../../server/api';

function CreateListingPage() {
  const router = useRouter();

  const onDelete = () => {
    router.push('/');
  };

  return (
    <Center id="listingFormContainer" px="1" py="6">
      <ListingForm onSubmit={postListing} onDelete={onDelete} />
    </Center>
  );
}

export default withSession(CreateListingPage);

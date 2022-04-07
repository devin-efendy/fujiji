import { Center } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ListingForm, withSession } from '../../components';
import { useSession } from '../../context/session';
import { postListing, uploadImage } from '../../server/api';

function CreateListingPage() {
  const router = useRouter();
  const { userData } = useSession();

  const onDelete = () => {
    router.push(`/user/${userData.userID}/listings`);
  };

  return (
    <Center id="listingFormContainer" px="1" py="6">
      <ListingForm onSubmit={postListing} onDelete={onDelete} onImageUpload={uploadImage} />
    </Center>
  );
}

export default withSession(CreateListingPage);

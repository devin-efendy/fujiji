import { Flex } from '@chakra-ui/react';
import EditProfile from '../../components/EditProfile/EditProfile';
import { editProfile } from '../../server/api';

export default function ProfilePage() {
  return (
    <Flex justifyContent="center" mx="auto" py="10">
      <EditProfile onSubmit={editProfile} />
    </Flex>
  );
}

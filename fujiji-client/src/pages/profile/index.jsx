import { Flex } from '@chakra-ui/react';
import { EditProfile, withSession } from '../../components';
import { editProfile } from '../../server/api';

function ProfilePage() {
  return (
    <Flex justifyContent="center" mx="auto" py="10">
      <EditProfile onSubmit={editProfile} />
    </Flex>
  );
}

export default withSession(ProfilePage);

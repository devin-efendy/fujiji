import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useSession } from '../../context/session';
import { SignIn } from '../../components';
import { signUp } from '../../server/api';

export default function SignUpPage() {
  const { isSignedIn } = useSession();
  const router = useRouter();

  if (isSignedIn) {
    router.push('/');
  }

  return (
    <Flex justifyContent="center" mx="auto" py="10">
      <SignIn onSubmit={signUp} isSignUp />
    </Flex>
  );
}

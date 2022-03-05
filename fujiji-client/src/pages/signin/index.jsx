import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { SignIn } from '../../components';
import { useSession } from '../../context/session';
import { signIn } from '../../server/api';

export default function SignInPage() {
  const { isSignedIn } = useSession();
  const router = useRouter();

  if (isSignedIn) {
    router.push('/');
  }

  return (
    <Flex justifyContent="center" mx="auto" py="10">
      <SignIn onSubmit={signIn} isSignUp={false} />
    </Flex>
  );
}

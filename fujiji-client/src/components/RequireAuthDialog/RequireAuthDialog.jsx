import {
  Flex, Divider, Link, Stack, Text,
} from '@chakra-ui/react';

export default function RequireAuthDialog() {
  return (
    <Flex id="requireAuthDialog" direction="column" alignItems="center">
      <Stack direction="row" h="60px" p={4} fontWeight="semibold">
        <Text>401</Text>
        <Divider orientation="vertical" />
        <Text>Unauthorized</Text>
      </Stack>
      <Text>
        You need to be logged in to perform this action.
        {' '}
        <Link href="/signin" color="teal.500">
          Sign In
        </Link>
      </Text>
    </Flex>
  );
}

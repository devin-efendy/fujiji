import {
  Box, Flex, Link, Text, VStack,
} from '@chakra-ui/react';

export default function Footer() {
  return (
    <Box bg="gray.100" p={4}>
      <VStack>
        <Flex alignItems="center" justifyContent="center" mb={5}>
          <Link
            aria-label="Marketplace link"
            px={2}
            href="https://github.com/devin-efendy/fujiji"
          >
            About Us
          </Link>
          <Link aria-label="Marketplace link" px={2} href="/">
            Home
          </Link>
        </Flex>
        <Text>Fujiji by Modern Diskette</Text>
      </VStack>
    </Box>
  );
}

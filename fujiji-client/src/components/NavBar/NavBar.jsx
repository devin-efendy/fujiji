import PropTypes from 'prop-types';
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Stack,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

const SignInGroup = (
  <Stack
    flex={{ base: 1, md: 0 }}
    justify="flex-end"
    direction="row"
    spacing={6}
  >
    <Button
      display={{ base: 'none', md: 'inline-flex' }}
      as="a"
      fontSize="sm"
      fontWeight={400}
      variant="link"
      href="#"
    >
      Sign Up
    </Button>
    <Button
      fontSize="sm"
      fontWeight={600}
      colorScheme="teal"
      color="white"
      href="#"
    >
      Sign In
    </Button>
  </Stack>
);

const UserGroup = (
  <Menu>
    <Button
      display={{ base: 'none', md: 'inline-flex' }}
      variant="solid"
      colorScheme="teal"
      size="sm"
      mr={4}
      leftIcon={<AddIcon />}
      aria-label="post-listing-button"
    >
      Post
    </Button>
    <MenuButton
      as={Button}
      rounded="full"
      variant="link"
      cursor="pointer"
      minW={0}
      aria-label="profile-button"
    >
      <Avatar aria-label="profile-image" size="sm" alt="Profile image" />
    </MenuButton>
    <MenuList>
      <MenuItem>Home</MenuItem>
      <MenuItem
        onClick={() => {
          // TODO: route to My Listings page
        }}
      >
        My Listings
      </MenuItem>
      <MenuDivider />
      <MenuItem
        onClick={() => {
          // TODO: Implement Sign Out
        }}
      >
        Sign Out
      </MenuItem>
    </MenuList>
  </Menu>
);

export default function NavBar({ isSignedIn = false }) {
  const rightNavGroup = isSignedIn ? UserGroup : SignInGroup;

  return (
    <Box bg="gray.100" px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Box fontWeight={600} fontSize="24px">
          <Link
            aria-label="Marketplace link"
            px={2}
            py={1}
            href="/test/test"
            _hover={{ textDecoration: 'none' }}
          >
            Fujiji
          </Link>
        </Box>

        <Flex alignItems="center">
          {rightNavGroup}
        </Flex>
      </Flex>
    </Box>
  );
}

NavBar.propTypes = {
  isSignedIn: PropTypes.bool,
};

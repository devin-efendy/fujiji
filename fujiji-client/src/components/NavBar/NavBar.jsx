import Link from 'next/link';
import {
  Box, Flex, Text, Button, useBoolean,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';
import { useSession } from '../../context/session';

function MenuItem({ children, isLast, to = '/' }) {
  return (
    <Text
      mb={{ base: isLast ? 0 : 8, sm: 0 }}
      mr={{ base: 0, sm: isLast ? 0 : 8 }}
      display="block"
    >
      <Link href={to}>{children}</Link>
    </Text>
  );
}

function SignInGroup() {
  return (
    <Flex
      align="center"
      justify={['center']}
      direction={['column', 'row', 'row', 'row']}
      pt={[4, 4, 0, 0]}
    >
      <MenuItem to="/">Home</MenuItem>
      <MenuItem to="/search">Search </MenuItem>
      <MenuItem to="/signin" isLast>
        <Button
          size="sm"
          rounded="md"
          color="white"
          bg="teal.500"
          _hover={{
            bg: 'teal.600',
          }}
        >
          Sign In
        </Button>
      </MenuItem>
    </Flex>
  );
}

function UserGroup({ signOutUser }) {
  return (
    <Flex
      align="center"
      justify={['center']}
      direction={['column', 'row', 'row', 'row']}
      pt={[4, 4, 0, 0]}
    >
      <MenuItem to="/">Home </MenuItem>
      <MenuItem to="/search">Search </MenuItem>
      <MenuItem to="/post">Post </MenuItem>
      <MenuItem to="/favourites">Favourites </MenuItem>
      <MenuItem to="/" isLast>
        <Button
          size="sm"
          rounded="md"
          onClick={() => {
            signOutUser();
          }}
        >
          Sign Out
        </Button>
      </MenuItem>
    </Flex>
  );
}

export default function NavBar() {
  const { isSignedIn, signOutUser } = useSession();
  const [show, setShow] = useBoolean();
  const rightNavGroup = isSignedIn ? (
    <UserGroup signOutUser={signOutUser} />
  ) : (
    <SignInGroup />
  );

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      // mb={8}
      p={[2, 2, 4, 6]}
      shadow="md"
    >
      <Flex align="center">
        <Box w="100px">
          <Text fontSize="3xl" fontWeight="bold">
            Fujiji
          </Text>
        </Box>
      </Flex>

      <Box display={{ base: 'block', md: 'none' }} onClick={setShow.toggle}>
        {show ? <CloseIcon w={4} h={8} /> : <HamburgerIcon w={8} h={8} />}
      </Box>

      <Box
        display={{ base: show ? 'block' : 'none', md: 'block' }}
        flexBasis={{ base: '100%', md: 'auto' }}
      >
        {rightNavGroup}
      </Box>
    </Flex>
  );
}

UserGroup.propTypes = {
  signOutUser: PropTypes.func,
};

MenuItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  isLast: PropTypes.bool,
  to: PropTypes.string,
};

import Link from 'next/link';
import {
  Box, Flex, Text, Button, useBoolean,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';

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

const SignInGroup = (
  <Flex
    align="center"
    justify={['center']}
    direction={['column', 'row', 'row', 'row']}
    pt={[4, 4, 0, 0]}
  >
    <MenuItem to="/">Home</MenuItem>
    <MenuItem to="/search">Search </MenuItem>
    <MenuItem to="/signIn" isLast>
      <Button
        size="sm"
        rounded="md"
        color={['primary.500', 'primary.500', 'white', 'white']}
        bg={['white', 'white', 'primary.500', 'primary.500']}
        _hover={{
          bg: ['primary.100', 'primary.100', 'primary.600', 'primary.600'],
        }}
      >
        Sign In
      </Button>
    </MenuItem>
  </Flex>
);

const UserGroup = (
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
    <MenuItem to="/signout" isLast>
      <Button
        size="sm"
        rounded="md"
        color={['primary.500', 'primary.500', 'white', 'white']}
        bg={['white', 'white', 'primary.500', 'primary.500']}
        _hover={{
          bg: ['primary.100', 'primary.100', 'primary.600', 'primary.600'],
        }}
      >
        Sign Out
      </Button>
    </MenuItem>
  </Flex>
);

export default function NavBar({ isSignedIn = false }) {
  const [show, setShow] = useBoolean();
  const rightNavGroup = isSignedIn ? UserGroup : SignInGroup;

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      p={[2, 2, 4, 8]}
      bg={['primary.500', 'primary.500', 'transparent', 'transparent']}
      color={['white', 'white', 'primary.700', 'primary.700']}
    >
      <Flex align="center">
        <Box
          w="100px"
          color={['white', 'white', 'primary.500', 'primary.500']}
        >
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

NavBar.propTypes = {
  isSignedIn: PropTypes.bool,
};

MenuItem.propTypes = {
  children: PropTypes.instanceOf(Object),
  isLast: PropTypes.bool,
  to: PropTypes.string,
};

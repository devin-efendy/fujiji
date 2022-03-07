import Link from 'next/link';
import {
  Box,
  Flex,
  Text,
  Button,
  useBoolean,
  Menu,
  MenuButton,
  MenuList,
  Avatar,
  MenuItem,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useSession } from '../../context/session';

function Item({ children, to = '/' }) {
  return (
    <Text
      mb={{ base: 8, sm: 0 }}
      mr={{ base: 0, sm: 8 }}
      display="block"
      color="primary.500"
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
      <Item to="/">Home</Item>
      <Item to="/search">Search</Item>
      <Item to="/signin" isLast>
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
      </Item>
    </Flex>
  );
}

function UserGroup({ signOutUser, userData }) {
  const router = useRouter();
  return (
    <Flex
      align="center"
      justify={['center']}
      direction={['column', 'row', 'row', 'row']}
      pt={[4, 4, 0, 0]}
    >
      <Item to="/">Home</Item>
      <Item to="/search">Search</Item>
      <Item to="/listing/create">Post</Item>
      <Item to="/favourites">Favourites</Item>
      <Menu>
        <MenuButton alignContent="center">
          <Avatar src="https://broken-link.com" name={userData.name} />
        </MenuButton>
        <MenuList>
          <MenuItem>
            <Item to="/profile">Profile</Item>
          </MenuItem>
          <MenuItem
            onClick={() => {
              router.push('/');
              signOutUser();
            }}
          >
            Sign Out
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}

export default function NavBar() {
  const { isSignedIn, signOutUser, userData } = useSession();
  const [show, setShow] = useBoolean();
  const rightNavGroup = isSignedIn ? (
    <UserGroup signOutUser={signOutUser} userData={userData} />
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
      p={[2, 2, 4, 6]}
      shadow="md"
    >
      <Flex align="center">
        <Box w="100px">
          <Text fontSize="3xl" fontWeight="bold" color="primary.500">
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
  userData: PropTypes.shape({
    id: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
    name: PropTypes.string,
  }),
};

Item.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  to: PropTypes.string,
};

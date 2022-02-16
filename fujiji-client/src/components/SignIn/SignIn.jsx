import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Link,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  FormControl,
  FormHelperText,
  Flex,
  Text,
} from '@chakra-ui/react';
import {
  AtSignIcon, LockIcon, ViewIcon, ViewOffIcon,
} from '@chakra-ui/icons';

function validateEmail(email) {
  return email.match(
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );
}

export default function SignIn({ isSignUp = false }) {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const [emailErrorMessage, setEmailError] = useState('');
  const [passwordErrorMessage, setPasswordError] = useState('');

  const submitButtonText = isSignUp ? 'Sign Up' : 'Login';
  const helperText = isSignUp
    ? 'Already have an account?'
    : "Don't have an account?";
  const helperLinkText = isSignUp ? 'Login' : 'Sign Up';
  const helperLink = isSignUp ? '#' : '#';

  const handleShowClick = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (event) => {
    setPasswordInput(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmailInput(event.target.value);
  };

  const handleOnSubmit = () => {
    // unset error messages
    setEmailError('');
    setPasswordError('');

    if (!emailInput) {
      setEmailError("Email can't be empty");
    }

    if (emailInput && !validateEmail(emailInput)) {
      setEmailError('Invalid email');
    }

    if (!passwordInput) {
      setPasswordError("Password can't be empty");
    }

    if (passwordInput && passwordInput.length < 8) {
      setPasswordError('Password need at least 8 characters');
    }
    /**
     * TODO: Handle email and password. And send appropriate request to backend
     */
  };

  return (
    <Flex>
      <Box minW={{ base: '90%', md: '400px' }} borderRadius="lg">
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          mb="1rem"
        >
          <Text fontSize="6xl">Fujiji</Text>
        </Flex>
        <Stack spacing={4} p="1rem">
          <FormControl>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <AtSignIcon color="gray.400" />
              </InputLeftElement>
              <Input
                aria-label="email"
                isInvalid={emailErrorMessage}
                type="email"
                placeholder="email address"
                onChange={handleEmailChange}
              />
            </InputGroup>
            {emailErrorMessage && (
              <FormHelperText>{emailErrorMessage}</FormHelperText>
            )}
          </FormControl>
          <FormControl>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <LockIcon color="gray.400" />
              </InputLeftElement>
              <Input
                aria-label="password"
                isInvalid={passwordErrorMessage}
                type={showPassword ? 'text' : 'password'}
                placeholder="password"
                onChange={handlePasswordChange}
              />
              <InputRightElement>
                <IconButton
                  size="sm"
                  color="gray.500"
                  bg="none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  onClick={handleShowClick}
                />
              </InputRightElement>
            </InputGroup>
            {passwordErrorMessage && (
              <FormHelperText>{passwordErrorMessage}</FormHelperText>
            )}
          </FormControl>
          <Button
            borderRadius="md"
            type="submit"
            variant="solid"
            colorScheme="teal"
            width="full"
            onClick={handleOnSubmit}
          >
            {submitButtonText}
          </Button>
        </Stack>
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box>
            {helperText}
            {' '}
            <Link color="teal.500" href={helperLink}>
              {helperLinkText}
            </Link>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}

SignIn.propTypes = {
  isSignUp: PropTypes.bool,
};

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
  useToast,
} from '@chakra-ui/react';
import {
  AtSignIcon,
  LockIcon,
  PhoneIcon,
  ViewIcon,
  ViewOffIcon,
} from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { validateEmail, validatePhoneNumber } from '../../utils/validate';
import { useSession } from '../../context/session';

export default function SignIn({ onSubmit, isSignUp = false }) {
  const router = useRouter();
  const toast = useToast();
  const { setCredentials } = useSession();

  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [firstNameInput, setFirstNameInput] = useState('');
  const [lastNameInput, setLastNameInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const [emailErrorMessage, setEmailError] = useState('');
  const [passwordErrorMessage, setPasswordError] = useState('');
  const [firstNameErrorMessage, setFirstNameError] = useState('');
  const [phoneErrorMessage, setPhoneError] = useState('');

  const submitButtonText = isSignUp ? 'Sign Up' : 'Login';
  const helperText = isSignUp
    ? 'Already have an account?'
    : "Don't have an account?";
  const helperLinkText = isSignUp ? 'Login' : 'Sign Up';
  const helperLink = isSignUp ? '/signin' : '/signup';

  const handleShowClick = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (event) => {
    setPasswordInput(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmailInput(event.target.value);
  };

  const handleFirstNameChange = (event) => {
    setFirstNameInput(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastNameInput(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneInput(event.target.value);
  };

  const handleOnSubmit = async () => {
    // unset error messages
    setEmailError('');
    setPasswordError('');
    setFirstNameError('');
    setPhoneError('');

    const signUpValidation = isSignUp
      ? validatePhoneNumber(phoneInput) && firstNameInput
      : true;

    const isInputValid = signUpValidation
      && validateEmail(emailInput)
      && passwordInput
      && passwordInput.length >= 8;

    if (!emailInput) {
      setEmailError("Email can't be empty");
    } else if (!validateEmail(emailInput)) {
      setEmailError('Invalid email');
    }

    if (!passwordInput) {
      setPasswordError("Password can't be empty");
    } else if (passwordInput.length < 8) {
      setPasswordError('Password need at least 8 characters');
    }

    if (isSignUp) {
      if (!firstNameInput) {
        setFirstNameError("Name can't be empty");
      }

      if (!phoneInput) {
        setPhoneError("Phone number can't be empty");
      } else if (!validatePhoneNumber(phoneInput)) {
        setPhoneError('Phone number is not valid');
      }
    }

    if (isInputValid) {
      const payload = {
        email: emailInput,
        password: passwordInput,
        firstName: firstNameInput,
        lastName: lastNameInput,
        phoneNumber: phoneInput,
      };

      const result = await onSubmit(payload);

      if (result.error) {
        // there is an error
        const statusCode = result.status;
        if (isSignUp) {
          if (statusCode !== 500) {
            setEmailError(result.error);
          }
        } else if (statusCode === 404) {
          setEmailError(result.error);
        } else if (statusCode === 401) {
          setPasswordError(result.error);
        }

        toast({
          title: 'Oops! Something went wrong...',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      } else {
        // successful signin or signup
        const {
          userId, email, name, phoneNumber, authToken,
        } = result.data;
        setCredentials(
          {
            userId,
            email,
            name,
            phoneNumber,
          },
          authToken,
        );
        router.push('/');
      }
    }
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
          {isSignUp && (
            <FormControl>
              <Stack direction="row">
                <InputGroup>
                  <Input
                    id="firstNameInput"
                    aria-label="first-name"
                    isInvalid={firstNameErrorMessage}
                    type="text"
                    placeholder="First Name"
                    onChange={handleFirstNameChange}
                  />
                </InputGroup>
                <InputGroup>
                  <Input
                    id="lastNameInput"
                    aria-label="last-name"
                    type="text"
                    placeholder="Last Name"
                    onChange={handleLastNameChange}
                  />
                </InputGroup>
              </Stack>
              {firstNameErrorMessage && (
                <FormHelperText>{firstNameErrorMessage}</FormHelperText>
              )}
            </FormControl>
          )}
          <FormControl>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <AtSignIcon color="gray.400" />
              </InputLeftElement>
              <Input
                id="emailInput"
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
                id="passwordInput"
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
          {isSignUp && (
            <FormControl>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <PhoneIcon color="gray.400" />
                </InputLeftElement>
                <Input
                  id="phoneNumberInput"
                  aria-label="phone-number"
                  isInvalid={phoneErrorMessage}
                  type="text"
                  placeholder="phone number"
                  onChange={handlePhoneNumberChange}
                />
              </InputGroup>
              {phoneErrorMessage && (
                <FormHelperText>{phoneErrorMessage}</FormHelperText>
              )}
            </FormControl>
          )}
          <Button
            aria-label="submit-user-form-button"
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
  onSubmit: PropTypes.func,
};

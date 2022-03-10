import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Avatar,
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
  useDisclosure,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from '@chakra-ui/react';
import {
  AtSignIcon,
  LockIcon,
  PhoneIcon,
  ViewIcon,
  ViewOffIcon,
  EditIcon,
} from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { validatePhoneNumber } from '../../utils/validate';
import { useSession } from '../../context/session';
import { withSession } from '..';

function EditProfilePage({ onSubmit }) {
  const { userData } = useSession();
  let { authToken } = useSession();
  const router = useRouter();

  const toast = useToast();
  const { setCredentials } = useSession();

  const [emailInput] = useState(userData.email);
  const [passwordInput, setPasswordInput] = useState('');
  const [firstNameInput, setFirstNameInput] = useState((userData.name).split(' ')[0]);
  const [lastNameInput, setLastNameInput] = useState((userData.name).split(' ')[1]);
  const [phoneInput, setPhoneInput] = useState(userData.phoneNumber);
  const { isOpen, onToggle } = useDisclosure();

  const [showPassword, setShowPassword] = useState(false);

  const [emailErrorMessage, setEmailError] = useState('');
  const [passwordErrorMessage, setPasswordError] = useState('');
  const [firstNameErrorMessage, setFirstNameError] = useState('');
  const [phoneErrorMessage, setPhoneError] = useState('');

  const submitButtonText = 'Save';

  const handleShowClick = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (event) => {
    setPasswordInput(event.target.value);
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

    setPhoneInput(phoneInput === '' ? userData.phoneNumber : phoneInput);

    const signUpValidation = validatePhoneNumber(phoneInput) && firstNameInput;

    const isInputValid = signUpValidation
      && passwordInput
      && passwordInput.length >= 8;

    if (!emailInput) {
      setEmailError("Email can't be empty");
    }

    if (!passwordInput) {
      setPasswordError("Password can't be empty");
    } else if (passwordInput.length < 8) {
      setPasswordError('Password need at least 8 characters');
    }

    if (!firstNameInput) {
      setFirstNameError("Name can't be empty");
    }

    if (!phoneInput) {
      setPhoneError("Phone number can't be empty");
    } else if (!validatePhoneNumber(phoneInput)) {
      setPhoneError('Phone number is not valid');
    }

    if (isInputValid) {
      const payload = {
        email: emailInput,
        password: passwordInput,
        firstName: firstNameInput,
        lastName: lastNameInput,
        phoneNumber: phoneInput,
        userID: userData.userID,
        auth: authToken,
      };

      const result = await onSubmit(payload);

      if (result.error) {
        // there is an error
        const statusCode = result.status;
        let title = 'Oops! Something went wrong...';
        if (statusCode === 404) {
          title = 'User not found! Seems like an error at our end.';
        } else if (statusCode === 400) {
          title = 'UserId must only contain numbers! Seems like an error at our end.';
        }

        toast({
          title,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Changes have been successful!',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });

        const {
          userId, email, name, phoneNumber,
        } = result.data;
        authToken = result.data.authToken;
        setCredentials(
          {
            userID: userId,
            email,
            name,
            phoneNumber,
          },
          authToken,
        );
        setTimeout(() => {
          router.push('/');
        }, 2000);
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
          { isOpen
         && (
         <Alert status="success" mb={4}>
           <AlertIcon />
           <Box flex="1">
             <AlertTitle>New Feature!</AlertTitle>
             <AlertDescription display="block">
               You will be able to upload your profile pictures. We are working on it!
             </AlertDescription>
           </Box>
           <CloseButton position="absolute" right="8px" top="8px" onClick={onToggle} />
         </Alert>
         )}
          <Avatar size="2xl" name={userData.name} src="" mb={4} />
          <Button onClick={onToggle} mb={4}><EditIcon /></Button>
          <Text fontSize="4xl">{ `Hello ${userData.name}!`}</Text>
        </Flex>
        <Stack spacing={4} p="1rem">
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
                  defaultValue={firstNameInput}
                />
              </InputGroup>
              <InputGroup>
                <Input
                  id="lastNameInput"
                  aria-label="last-name"
                  type="text"
                  placeholder="Last Name"
                  onChange={handleLastNameChange}
                  defaultValue={lastNameInput}
                />
              </InputGroup>
            </Stack>
            {firstNameErrorMessage && (
              <FormHelperText>{firstNameErrorMessage}</FormHelperText>
            )}
          </FormControl>
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
                defaultValue={emailInput}
                isDisabled
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
                defaultValue={phoneInput}
              />
            </InputGroup>
            {phoneErrorMessage && (
              <FormHelperText>{phoneErrorMessage}</FormHelperText>
            )}
          </FormControl>

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
      </Box>
    </Flex>
  );
}

EditProfilePage.propTypes = {
  onSubmit: PropTypes.func,
};

export default withSession(EditProfilePage);

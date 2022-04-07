import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
import {
  AspectRatio,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormHelperText,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Stack,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import {
  AddIcon,
  AttachmentIcon,
  DeleteIcon,
  EditIcon,
} from '@chakra-ui/icons';
import { BsCurrencyDollar } from 'react-icons/bs';
import { useRouter } from 'next/router';
import AlertContainer from '../AlertContainer/AlertContainer';
import { provinces, furnitureCategories } from '../../utils/fujijiConfig';
import { useSession } from '../../context/session';

const inputMarginTop = 4;

const allowedFileExtension = ['.png', '.jpg', '.jpeg'];
const allowedFileType = ['image/png', 'image/jpg', 'image/jpeg'];

function renderDeleteButton(isUpdate, onClick) {
  return (
    <Button
      aria-label="delete-button"
      ml="4"
      leftIcon={<DeleteIcon fontSize="sm" />}
      colorScheme={isUpdate ? 'red' : 'gray'}
      fontWeight="semibold"
      variant="outline"
      onClick={onClick}
    >
      {isUpdate ? 'Delete' : 'Discard'}
    </Button>
  );
}

function validateImage(fileImage) {
  const fileExtension = fileImage.name.split('.').pop();
  const fileType = fileImage.type;
  return (
    allowedFileExtension.includes(`.${fileExtension}`)
    && allowedFileType.includes(fileType)
  );
}

/**
 * @param {string} title title of the listing
 * @param {string} description description of the listing
 * @param {string} condition condition of the furniture
 * @param {string} city city where the seller sell this listing
 * @param {string} province province CODE where the seller sell this listing
 * @param {string} imageUrl URL to image that need to be rendered
 * @param {bool} isUpdate flag to toggle between POST and UPDATE form
 * @param {func} onSubmit callback function that will be executed when the form is submitted with valid input
 * @param {func} onDelete callback function that will be executed when the form is discarded (during POST) and deleted (during UPDATE)
 */
export default function ListingForm({
  listingID,
  title,
  description,
  condition = 'Used',
  city,
  province = 'MB',
  imageUrl,
  price,
  category = 'Other',
  isUpdate = false,
  onSubmit,
  onDelete,
  onImageUpload,
}) {
  const { userData, authToken } = useSession();
  const router = useRouter();
  const toast = useToast();

  const [listingTitle, setListingTitle] = useState(title);
  const [listingDescription, setListingDescription] = useState(description);
  const [listingCondition, setListingCondition] = useState(condition);
  const [listingCity, setListingCity] = useState(city);
  const [listingProvince, setListingProvince] = useState(province);
  const [listingImageUrl, setListingImageUrl] = useState(imageUrl);
  const [listingPrice, setListingPrice] = useState(price);
  const [listingCategory, setListingCategory] = useState(category);

  const [uploadErrorMessage, setUploadErrorMessage] = useState('');
  const [titleErrorMessage, setTitleErrorMessage] = useState('');
  const [cityErrorMessage, setCityErrorMessage] = useState('');
  const [priceErrorMessage, setPriceErrorMessage] = useState('');

  const [uploadedImage, setUploadedImage] = useState(undefined);

  const inputRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const alertDialogProps = {
    headerText: isUpdate ? 'Delete Listing' : 'Discard Changes',
    contentText: isUpdate
      ? "Are you sure? You can't undo this action afterwards."
      : 'Are you sure? All unsaved changes will be lost.',
    confirmButtonText: isUpdate ? 'Delete' : 'Discard',
    confirmButtonColor: 'red',
    cancelButtonText: 'Cancel',
    isOpen,
    onClose,
    cancelRef,
    onConfirm: onDelete,
  };

  const uploadButtonText = uploadedImage
    ? uploadedImage.name
    : 'Attach new image';

  const handleOnSubmit = async () => {
    setTitleErrorMessage('');
    setCityErrorMessage('');
    setUploadErrorMessage('');
    setPriceErrorMessage('');

    const isImageExist = !isUpdate ? uploadedImage : imageUrl;

    const isValid = listingTitle && isImageExist && listingCity && listingPrice;

    if (!listingTitle) {
      setTitleErrorMessage("Title can't be empty");
    }

    if (!listingCity) {
      setCityErrorMessage("City can't be empty");
    }

    if (!isImageExist) {
      setUploadErrorMessage('Listing must have an image');
    }

    if (!listingPrice) {
      setPriceErrorMessage('Price is invalid (valid ex: 5000 or 49.99)');
    }

    if (isValid) {
      const payload = {
        userID: userData.userID,
        title: listingTitle,
        condition: listingCondition,
        category: listingCategory,
        city: listingCity,
        provinceCode: listingProvince,
        imageURL: listingImageUrl,
        price: listingPrice,
        description: listingDescription,
        authToken,
      };

      const response = await onSubmit(
        isUpdate ? { listingID, ...payload } : payload,
      );

      if (response.error) {
        if (response.status === 400) {
          setCityErrorMessage(response.error);
        }

        toast({
          title: 'Oops! Something went wrong...',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      } else {
        toast({
          title: isUpdate
            ? 'Listing is successfully updated!'
            : 'Listing is successfully created!',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
        router.push(`/user/${userData.userID}/listings`);
      }
    }
  };

  const handleOnImageUpload = (e) => {
    setUploadErrorMessage('');
    const uploadedFile = e.target.files[0] || undefined;
    if (!uploadedFile || !validateImage(uploadedFile)) {
      setUploadErrorMessage('Allowed files: .png, .jpg, .jpeg');
    } else {
      setUploadedImage(uploadedFile);
      const url = await onImageUpload(uploadedFile);
      if (url.error) {
        toast({
          title: 'Oops! Unable to upload the picture, We are working on it!',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      } else {
        url.then((result) => setListingImageUrl(result.data.imageUrl)).catch(() => {
          toast({
            title: 'Oops! Unable to upload the picture, We are working on it!',
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
        });
      }
    }
    e.target.value = null; // reset onChange value
  };

  return (
    <Box
      id="listingForm"
      p={[3, 6]}
      w={['100%', '700px']}
      borderWidth="1px"
      borderRadius="lg"
    >
      <FormControl>
        <Box>
          <FormLabel htmlFor="listingTitle" id="listing-title-label">
            Title
          </FormLabel>
          <Input
            aria-label="listing-title"
            id="listing-title"
            type="text"
            placeholder="Title"
            onChange={(e) => setListingTitle(e.target.value)}
            value={listingTitle}
            isInvalid={titleErrorMessage}
          />
          {titleErrorMessage && (
            <FormHelperText>{titleErrorMessage}</FormHelperText>
          )}
        </Box>
        <Stack direction="row" mt={inputMarginTop} align="stretch">
          <Box flex="1">
            <FormLabel htmlFor="listingCdondition" id="listing-condition-label">
              Condition
            </FormLabel>
            <Select
              aria-label="listing-condition"
              id="listing-condition-selector"
              onChange={(e) => {
                setListingCondition(e.target.value);
              }}
              value={listingCondition}
            >
              <option key="new">New</option>
              <option key="used">Used</option>
              <option key="refurbished">Refurbished</option>
            </Select>
          </Box>
          <Box flex="1">
            <FormLabel htmlFor="listingCategory" id="listing-category-label">
              Category
            </FormLabel>
            <Select
              aria-label="listing-category"
              id="listing-category-selector"
              onChange={(e) => {
                setListingCategory(e.target.value);
              }}
              value={listingCategory}
            >
              {furnitureCategories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </Select>
          </Box>
        </Stack>

        <Box mt={inputMarginTop}>
          <FormLabel
            htmlFor="listingDescription"
            id="listing-description-label"
          >
            Description
          </FormLabel>
          <Textarea
            aria-label="listing-description"
            id="listing-description"
            placeholder="Tell buyers abour your listing!"
            resize="vertical"
            onChange={(e) => setListingDescription(e.target.value)}
            value={listingDescription}
          />
        </Box>

        <Stack direction="row" mt={inputMarginTop}>
          <Box>
            <FormLabel htmlFor="listingCity" id="listing-city-label">
              City
            </FormLabel>
            <Input
              aria-label="listing-city"
              id="listing-city"
              type="text"
              onChange={(e) => setListingCity(e.target.value)}
              value={listingCity}
              isInvalid={cityErrorMessage}
            />
            {cityErrorMessage && (
              <FormHelperText>{cityErrorMessage}</FormHelperText>
            )}
          </Box>
          <Box>
            <FormLabel htmlFor="listingProvince" id="listing-province-label">
              Province
            </FormLabel>
            <Select
              aria-label="listing-province"
              id="listing-province-selector"
              onChange={(e) => {
                setListingProvince(e.target.value);
              }}
              value={listingProvince}
            >
              {provinces.map((p) => (
                <option key={p.code}>{p.code}</option>
              ))}
            </Select>
          </Box>
        </Stack>

        <Box mt={inputMarginTop}>
          <FormLabel htmlFor="listingImage" id="listing-image-label">
            Upload Image
          </FormLabel>
          {listingImageUrl && (
            <AspectRatio ratio={4 / 3} mb="4">
              <Image
                aria-label="listing-image"
                id="listing-image"
                alt="Current uploaded listing image"
                src={listingImageUrl}
                borderWidth="1px"
                borderRadius="lg"
                shadow="xs"
              />
            </AspectRatio>
          )}
          <InputGroup>
            <Button
              onClick={() => inputRef.current.click()}
              aria-label="upload-button"
              leftIcon={<AttachmentIcon />}
              w="100%"
              fontWeight="normal"
              borderWidth={uploadErrorMessage ? '2px' : '0px'}
              borderColor={uploadErrorMessage ? 'red' : ''}
            >
              <Text isTruncated>{uploadButtonText}</Text>
            </Button>
            <input
              id="image-upload-input"
              type="file"
              ref={inputRef}
              hidden
              onChange={handleOnImageUpload}
            />
          </InputGroup>
          {uploadErrorMessage && (
            <FormHelperText>{uploadErrorMessage}</FormHelperText>
          )}
        </Box>

        <Box mt={inputMarginTop} maxW="230px">
          <FormLabel htmlFor="listingPrice" id="listing-price-label">
            Price
          </FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon as={BsCurrencyDollar} color="gray.400" />
            </InputLeftElement>
            <Input
              aria-label="listing-price"
              id="listing-price"
              type="number"
              onChange={(e) => setListingPrice(e.target.value)}
              value={listingPrice}
              isInvalid={priceErrorMessage}
              step="0.01"
            />
          </InputGroup>
          {priceErrorMessage && (
            <FormHelperText>{priceErrorMessage}</FormHelperText>
          )}
        </Box>

        <Flex mt="10">
          <Button
            aria-label="submit-button"
            leftIcon={
              isUpdate ? <EditIcon fontSize="sm" /> : <AddIcon fontSize="sm" />
            }
            colorScheme="teal"
            fontWeight="semibold"
            onClick={handleOnSubmit}
          >
            {isUpdate ? 'Update' : 'Post'}
          </Button>
          {renderDeleteButton(isUpdate, onOpen)}
          <AlertContainer {...alertDialogProps} />
        </Flex>
      </FormControl>
    </Box>
  );
}

ListingForm.propTypes = {
  listingID: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  condition: PropTypes.string,
  city: PropTypes.string,
  province: PropTypes.string,
  imageUrl: PropTypes.string,
  price: PropTypes.number,
  category: PropTypes.string,
  isUpdate: PropTypes.bool,
  onSubmit: PropTypes.func,
  onDelete: PropTypes.func,
  onImageUpload: PropTypes.func,
};

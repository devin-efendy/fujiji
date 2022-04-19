import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Flex,
  Text,
  Image,
  Icon,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { StarIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { MdLocationOn } from 'react-icons/md';
import { BsCalendar } from 'react-icons/bs';
import { BiCategory } from 'react-icons/bi';
import { format, isValid, parse } from 'date-fns';
import { useRouter } from 'next/router';
import BoostPackageSelection from '../BoostPackageSelection/BoostPackageSelection';
import { postBoost } from '../../server/api';
import ConditionBadge from '../ConditionBadge/ConditionBadge';
import { useSession } from '../../context/session';

function ListingInfoBox({ icon, infoField, infoContent }) {
  return (
    <Box
      color="gray.500"
      fontSize="xs"
      display="flex"
      alignItems="center"
      mt="3"
    >
      <Icon as={icon} w={6} h={6} color="teal.500" />
      <Text ml={2} fontWeight="medium" textTransform="uppercase">
        {infoField}
        :
      </Text>
      <Text
        ml={2}
        fontWeight="semibold"
        letterSpacing="wide"
        textTransform="uppercase"
      >
        {infoContent}
      </Text>
    </Box>
  );
}

export default function Listing({
  isSeller = false,
  boostDayLeft,
  listingID,
  category,
  condition,
  description,
  imageUrl,
  city,
  province,
  postingDate,
  price,
  title,
  onContactClick = () => {},
  contactEmail,
}) {
  const router = useRouter();
  const toast = useToast();
  const { query } = useRouter();
  const { result, packageID } = query;
  const { authToken } = useSession();

  useEffect(() => {
    async function handleBoost() {
      if (result === 'success') {
        const payload = {
          listingID,
          packageID,
          authToken,
        };
        const response = await postBoost(payload);
        if (response.error) {
          let errorText = '';
          if (response.status === '500') {
            errorText = 'Something went wrong... Check if Fujiji API is running';
          } else if (response.status === '404') {
            errorText = 'Payment was successful but there was error fetching your boost package, please refresh or contact support';
          }

          toast({
            title: errorText,
            status: 'error',
            duration: 4000,
            isClosable: true,
            position: 'top',
          });
        } else {
          toast({
            title: 'Your boost package has been activated',
            status: 'success',
            duration: 4000,
            isClosable: true,
            position: 'top',
          });
        }
      } else if (result === 'error') {
        toast({
          title: 'Error activating the boost package, Retry!',
          status: 'error',
          duration: 4000,
          isClosable: true,
          position: 'top',
        });
      }

      router.replace(`/listing/${listingID}`, undefined, { shallow: true });
    }

    handleBoost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const formattedPrice = price.toLocaleString();
  const parsedDate = parse(postingDate, 'yyyy-MM-dd', new Date());
  const formattedDate = isValid(parsedDate)
    ? format(new Date(parsedDate), 'dd MMMM yyyy')
    : '';
  const formattedLocation = `${city}, ${province}`;

  const onEditClick = () => {
    router.push(`/listing/edit/${listingID}`);
  };

  const openModal = () => {
    router.replace(`/listing/${listingID}`, undefined, { shallow: true });
    onOpen();
  };

  return (
    <div>
      <Flex d="inline-flex" flexDir={['column', null, 'row', 'row']}>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Your advertisment deserves a boost!</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <BoostPackageSelection />
            </ModalBody>
          </ModalContent>
        </Modal>
        <Box>
          <Flex
            mx="auto"
            w={['330px', null, null, '400px']}
            h={['330px', null, null, '400px']}
            justifyContent="center"
            borderWidth="1px"
            overflow="hidden"
            rounded="xl"
          >
            <Image src={imageUrl} objectFit="cover" />
          </Flex>
        </Box>

        <Flex
          id="listing-content-container"
          flexDir="column"
          minW={['320px', null, '360px', '400px']}
          maxW="500px"
          mt={['6', '0']}
          mx={['2', '5', '10']}
        >
          <Text fontSize="3xl" fontWeight="bold">
            {title}
          </Text>

          {isSeller && boostDayLeft > 0 && (
            <Text my="2" color="grey">
              <TriangleUpIcon mr="2" color="yellow.400" fontSize="20" />
              This listing is boosted.
              {' '}
              {boostDayLeft}
              {' '}
              days remaining.
            </Text>
          )}

          <Box mt="2">
            <ConditionBadge condition={condition} />
          </Box>

          <Text mt="4" fontSize="sm">
            {description || 'No description provided by the seller.'}
          </Text>

          <Box mt="10">
            <ListingInfoBox
              icon={BiCategory}
              infoField="Category"
              infoContent={category}
            />

            {formattedDate && (
              <ListingInfoBox
                icon={BsCalendar}
                infoField="Posted On"
                infoContent={formattedDate}
              />
            )}

            <ListingInfoBox
              icon={MdLocationOn}
              infoField="Seller Location"
              infoContent={formattedLocation}
            />
          </Box>

          <Box
            d="flex"
            mt="10"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box fontSize="xl" fontWeight="semibold" color="teal.600">
              $
              {' '}
              {formattedPrice}
            </Box>
            {isSeller && (
              <Box>
                <Button
                  aria-label="edit-listing-button"
                  colorScheme="teal"
                  onClick={onEditClick}
                >
                  Edit
                </Button>
                {!boostDayLeft && (
                  <Button
                    leftIcon={<StarIcon />}
                    ml="3"
                    variant="outline"
                    aria-label="boost-listing-button"
                    colorScheme="yellow"
                    onClick={openModal}
                  >
                    Boost
                  </Button>
                )}
              </Box>
            )}
            {!isSeller && (
              <Link
                href={`mailto:${contactEmail}`}
                _hover={{ textDecoration: 'none' }}
              >
                <Button
                  aria-label="contact-seller-button"
                  colorScheme="teal"
                  onClick={onContactClick}
                >
                  Contact
                </Button>
              </Link>
            )}
          </Box>
        </Flex>
      </Flex>
    </div>
  );
}

ListingInfoBox.propTypes = {
  icon: PropTypes.elementType,
  infoField: PropTypes.string,
  infoContent: PropTypes.string,
};

Listing.propTypes = {
  isSeller: PropTypes.bool,
  boostDayLeft: PropTypes.number,
  listingID: PropTypes.number,
  imageUrl: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.number,
  description: PropTypes.string,
  category: PropTypes.string,
  city: PropTypes.string,
  province: PropTypes.string,
  condition: PropTypes.string,
  onContactClick: PropTypes.func,
  postingDate: PropTypes.string,
  contactEmail: PropTypes.string,
};

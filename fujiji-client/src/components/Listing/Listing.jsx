import PropTypes from 'prop-types';
import {
  Box, Button, Flex, Text, Image, Icon,
} from '@chakra-ui/react';
import { MdLocationOn } from 'react-icons/md';
import { BsCalendar } from 'react-icons/bs';
import { BiCategory } from 'react-icons/bi';
import { format, isValid, parse } from 'date-fns';
import ConditionBadge from '../ConditionBadge/ConditionBadge';

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
  category,
  condition,
  description,
  imageUrl,
  location,
  postingDate,
  price,
  title,
  onContactClick,
}) {
  const formattedPrice = price.toLocaleString();
  const parsedDate = parse(postingDate, 'yyyy-MM-dd', new Date());
  const formattedDate = isValid(parsedDate)
    ? format(new Date(parsedDate), 'dd MMMM yyyy')
    : '';
  const { city, provinceCode } = location;
  const formattedLocation = `${city}, ${provinceCode}`;

  return (
    <Flex d="inline-flex" flexDir={['column', null, 'row', 'row']}>
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
        ml={['0', '10']}
      >
        <Text fontSize="3xl" fontWeight="bold">
          {title}
        </Text>

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
          <Button aria-label="contact-seller-button" colorScheme="teal" size="md" onClick={() => onContactClick()}>
            Contact
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
}

ListingInfoBox.propTypes = {
  icon: PropTypes.elementType,
  infoField: PropTypes.string,
  infoContent: PropTypes.string,
};

Listing.propTypes = {
  imageUrl: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.number,
  description: PropTypes.string,
  category: PropTypes.string,
  location: PropTypes.shape({
    city: PropTypes.string,
    provinceCode: PropTypes.string,
  }),
  condition: PropTypes.string,
  onContactClick: PropTypes.func,
  postingDate: PropTypes.string,
};

import PropTypes from 'prop-types';
import {
  AspectRatio, Box, Badge, Text, Image, Icon,
} from '@chakra-ui/react';
import { MdLocationOn } from 'react-icons/md';
import { BsCalendar } from 'react-icons/bs';
import { format, isValid, parse } from 'date-fns';

function renderConditionBadge(condition) {
  switch (condition) {
    case 'new':
      return (
        <Badge borderRadius="full" px="2" colorScheme="teal">
          Brand New
        </Badge>
      );
    case 'used':
      return (
        <Badge borderRadius="full" px="2" colorScheme="orange">
          Used
        </Badge>
      );
    case 'refurbished':
      return (
        <Badge borderRadius="full" px="2" colorScheme="blue">
          Refurbished
        </Badge>
      );
    default:
      return undefined;
  }
}

function ListingInfoBox({ children }) {
  return (
    <Box
      color="gray.500"
      fontWeight="semibold"
      letterSpacing="wide"
      textTransform="uppercase"
      fontSize="xs"
      display="flex"
      alignItems="center"
    >
      {children}
    </Box>
  );
}
export default function AdListing({
  imageUrl,
  imageAlt,
  title,
  price,
  description = '',
  location,
  condition,
  onClick = undefined,
  postingDate,
}) {
  const formattedPrice = price.toLocaleString();
  const parsedDate = parse(postingDate, 'yyyy-MM-dd', new Date());
  const formattedDate = isValid(parsedDate)
    ? format(new Date(parsedDate), 'dd MMM yyyy')
    : '';

  const { city, provinceCode } = location;
  const formattedLocation = `${city}, ${provinceCode}`;

  return (
    <Box
      as="button"
      w="xs"
      borderWidth="1px"
      rounded="lg"
      onClick={onClick}
      _hover={{ boxShadow: 'lg' }}
    >
      <AspectRatio ratio={4 / 3}>
        <Image src={imageUrl} roundedTop="md" alt={imageAlt} />
      </AspectRatio>
      <Box p="6" pb="5" d="flex" flexDirection="column" height="230px">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          {formattedDate && (
            <ListingInfoBox>
              <Icon as={BsCalendar} w={5} h={5} color="teal.500" />
              <Text ml={2}>{formattedDate}</Text>
            </ListingInfoBox>
          )}

          <ListingInfoBox>
            <Icon as={MdLocationOn} w={5} h={5} color="teal.500" />
            <Text ml={1}>{formattedLocation}</Text>
          </ListingInfoBox>
        </Box>

        <Box
          mt="3"
          fontWeight="Bold"
          lineHeight="tight"
          textAlign="left"
          fontSize="lg"
        >
          {title}
        </Box>

        {description && (
          <Box
            mt={1}
            textAlign="left"
            noOfLines={4}
            color="gray.600"
            fontSize="sm"
          >
            {description}
          </Box>
        )}

        <Box
          mt="auto"
          d="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          {renderConditionBadge(condition)}
          <Box
            textAlign="right"
            fontSize="lg"
            fontWeight="semibold"
            color="teal.600"
          >
            $
            {' '}
            {formattedPrice}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

ListingInfoBox.propTypes = {
  children: PropTypes.node,
};

AdListing.propTypes = {
  imageUrl: PropTypes.string,
  imageAlt: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.number,
  description: PropTypes.string,
  location: PropTypes.shape({
    city: PropTypes.string,
    provinceCode: PropTypes.string,
  }),
  condition: PropTypes.string,
  onClick: PropTypes.func,
  postingDate: PropTypes.string,
};

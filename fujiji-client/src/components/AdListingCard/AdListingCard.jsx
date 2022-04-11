import PropTypes from 'prop-types';
import {
  AspectRatio, Box, Text, Image, Icon,
} from '@chakra-ui/react';
import { MdLocationOn } from 'react-icons/md';
import { BsCalendar } from 'react-icons/bs';
import { format, isValid, parse } from 'date-fns';
import { TriangleUpIcon } from '@chakra-ui/icons';
import ConditionBadge from '../ConditionBadge/ConditionBadge';

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
export default function AdListingCard({
  isBoosted = false,
  imageUrl,
  imageAlt,
  title,
  price,
  description = '',
  city,
  province,
  condition,
  onClick = undefined,
  postingDate,
}) {
  const formattedPrice = price.toLocaleString();
  const parsedDate = parse(postingDate, 'yyyy-MM-dd', new Date());
  const formattedDate = isValid(parsedDate)
    ? format(new Date(parsedDate), 'dd MMM yyyy')
    : '';

  const formattedLocation = `${city}, ${province}`;

  return (
    <Box
      as="button"
      w="xs"
      borderWidth={isBoosted ? '2px' : '1px'}
      borderColor={isBoosted ? 'teal.400' : ''}
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
          noOfLines={1}
        >
          {title}
        </Box>

        {description && (
          <Box
            data-testid="DESC_TEST_ID"
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
          <Box>
            {isBoosted && (
              <TriangleUpIcon
                data-testid="TEST_BOOST_ICON"
                color="teal"
                mr="3"
                fontSize="20"
              />
            )}
            <ConditionBadge condition={condition} />
          </Box>
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

AdListingCard.propTypes = {
  isBoosted: PropTypes.bool,
  imageUrl: PropTypes.string,
  imageAlt: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.number,
  description: PropTypes.string,
  city: PropTypes.string,
  province: PropTypes.string,
  condition: PropTypes.string,
  onClick: PropTypes.func,
  postingDate: PropTypes.string,
};

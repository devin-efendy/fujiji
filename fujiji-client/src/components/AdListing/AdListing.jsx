import PropTypes from 'prop-types';
import { Box, Badge, Image } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
/**
 * TODO: This is just an example, Change this to actual implementation
 */
export default function AdListing({
  imageUrl,
  imageAlt,
  beds,
  baths,
  title,
  formattedPrice,
  reviewCount,
  rating,
}) {
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={imageUrl} alt={imageAlt} />

      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            New
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {beds}
            {' '}
            beds &bull;
            {baths}
            {' '}
            baths
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {title}
        </Box>

        <Box>
          {formattedPrice}
          <Box as="span" color="gray.600" fontSize="sm">
            / wk
          </Box>
        </Box>

        <Box display="flex" mt="2" alignItems="center">
          {Array(5)
            .fill('')
            .map((_, i) => (
              <StarIcon
                color={i < rating ? 'teal.500' : 'gray.300'}
              />
            ))}
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            {reviewCount}
            {' '}
            reviews
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

AdListing.propTypes = {
  imageUrl: PropTypes.string,
  imageAlt: PropTypes.string,
  beds: PropTypes.number,
  baths: PropTypes.number,
  title: PropTypes.string,
  formattedPrice: PropTypes.string,
  reviewCount: PropTypes.number,
  rating: PropTypes.number,
};

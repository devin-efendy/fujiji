import PropTypes from 'prop-types';
import { Badge } from '@chakra-ui/react';

export default function ConditionBadge({ condition }) {
  switch (condition.toLowerCase()) {
    case 'new':
      return (
        <Badge borderRadius="full" px="2" colorScheme="teal">
          new
        </Badge>
      );
    case 'used':
      return (
        <Badge borderRadius="full" px="2" colorScheme="orange">
          used
        </Badge>
      );
    case 'refurbished':
      return (
        <Badge borderRadius="full" px="2" colorScheme="blue">
          refurbished
        </Badge>
      );
    default:
      return undefined;
  }
}

ConditionBadge.propTypes = {
  condition: PropTypes.string,
};

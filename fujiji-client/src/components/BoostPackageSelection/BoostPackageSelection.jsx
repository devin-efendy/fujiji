import PropTypes from 'prop-types';
import {
  Button, Box, Flex, Text,
} from '@chakra-ui/react';

import { useState } from 'react';
import StripeCheckoutButton from '../Stripe/Stripe';

const packages = [
  { id: 0, name: '3 Days Boost', price: 5 },
  { id: 1, name: '7 Days Boost', price: 10 },
  { id: 2, name: '30 Days Boost', price: 30 },
];

function PackageButton({
  isSelected,
  packageId,
  packageName,
  packagePrice,
  onClick,
}) {
  return (
    <Button
      key={packageId}
      d="flex"
      flexDir="row"
      justifyContent="space-between"
      mb="3"
      p="6"
      id={`package-${packageId}-button`}
      aria-label={`select ${packageName} package button`}
      colorScheme={isSelected ? 'teal' : 'gray'}
      variant={isSelected ? 'solid' : 'outline'}
      onClick={onClick}
    >
      <Flex>{packageName}</Flex>
      <Flex>
        $
        {packagePrice}
      </Flex>
    </Button>
  );
}

export default function BoostPackageSelection() {
  const [selectedId, setSelectedId] = useState(0);

  return (
    <Box
      maxW="450px"
      borderWidth="1px"
      borderColor="grey.100"
      borderRadius="base"
      p="6"
    >
      <Text fontSize="xl" mb="4">
        Select your package:
      </Text>
      <Flex flexDir="column">
        {packages.map((pckg) => (
          <PackageButton
            isSelected={selectedId === pckg.id}
            packageId={pckg.id}
            packageName={pckg.name}
            packagePrice={pckg.price}
            onClick={() => {
              setSelectedId(pckg.id);
            }}
          />
        ))}
      </Flex>
      <Flex mt="5" ml={300}>
        <StripeCheckoutButton
          boostPackageName={packages[selectedId].name}
          boostPackagePrice={packages[selectedId].price}
          boostPackageID={packages[selectedId].id + 1}
        />
      </Flex>
    </Box>
  );
}

PackageButton.propTypes = {
  isSelected: PropTypes.bool,
  packageId: PropTypes.number,
  packageName: PropTypes.string,
  packagePrice: PropTypes.number,
  onClick: PropTypes.func,
};

import {
  Center,
  SimpleGrid,
  Spinner,
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormLabel,
  Select,
  InputGroup,
  InputLeftElement,
  Icon,
} from '@chakra-ui/react';
import { SettingsIcon, Search2Icon } from '@chakra-ui/icons';
import { BsCurrencyDollar } from 'react-icons/bs';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useState, useCallback } from 'react';
import { AdListingCard } from '../../components';
import { searchListings } from '../../server/api';
import {
  provinces,
  furnitureCategories,
  conditions,
} from '../../utils/fujijiConfig';

function SearchPage({
  condition = '',
  province = '',
  category = '',
  minPrice = '',
  maxPrice = '',
}) {
  const router = useRouter();
  const [listings, setListings] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [listingCondition, setListingCondition] = useState(condition);
  const [searchText, setSearchText] = useState('');
  const [listingCity, setListingCity] = useState(province);
  const [listingProvince, setListingProvince] = useState(province);
  const [minListingPrice, setMinListingPrice] = useState(minPrice);
  const [maxListingPrice, setMaxListingPrice] = useState(maxPrice);
  const [listingCategory, setListingCategory] = useState(category);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const getSearchListings = useCallback(async () => {
    const payload = {
      title: searchText,
      condition: listingCondition,
      category: listingCategory,
      city: listingCity,
      province: listingProvince,
      startPrice: minListingPrice,
      endPrice: maxListingPrice,
    };
    return searchListings(payload);
  }, [
    searchText,
    listingCondition,
    listingCategory,
    listingCity,
    listingProvince,
    minListingPrice,
    maxListingPrice,
  ]);

  const clearFilters = () => {
    setSearchText('');
    setListingCondition('');
    setListingCategory('');
    setListingProvince('');
    setListingCity('');
    setMaxListingPrice('');
    setMinListingPrice('');

    onClose();
  };

  // for this page we are using client-side rendering
  // so we can show loading indicator when fetching huge list of listings
  useEffect(() => {
    async function fetchData() {
      const res = await getSearchListings();
      if (res.error) {
        setErrorMessage(res.error);
      } else {
        setListings(res);
      }
    }

    fetchData();
  }, [getSearchListings]);

  let renderListings;

  if (listings.length > 0) {
    // There are listings that exist for this user
    const listOfListings = listings.map((listing) => {
      const onSubmit = () => {
        router.push(`/listing/${listing.listingID}`);
      };
      return (
        <Box id={`listing=${listing.listingID}`} key={listing.listingID}>
          <AdListingCard {...listing} onClick={onSubmit} />
        </Box>
      );
    });

    renderListings = (
      <SimpleGrid
        id="userListingsContent"
        columns={[1, 2, null, null, 3]}
        spacing="10"
      >
        {listOfListings}
      </SimpleGrid>
    );
  } else if (errorMessage) {
    // User does not have any listings yet
    renderListings = <Text>{errorMessage}</Text>;
  } else {
    // Loading indicator while fetching
    renderListings = (
      <Center>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="lg"
          mr="4"
        />
        <Text id="testId">We are getting your listings...</Text>
      </Center>
    );
  }

  const handleOnSubmit = async () => {
    const response = await getSearchListings();
    if (response.error) {
      setErrorMessage(response.error);
      setListings([]);
    } else {
      setListings(response);
    }
    onClose();
  };

  return (
    <Center px="1" py="6" flexDir="column">
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Search Filters</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <Box flex="1">
                <FormLabel
                  htmlFor="listingCdondition"
                  id="listing-condition-label"
                >
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
                  {conditions.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </Select>
              </Box>
              <Box flex="1" mt={4}>
                <FormLabel
                  htmlFor="listingCategory"
                  id="listing-category-label"
                >
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

              <Box mt={4}>
                <FormLabel htmlFor="listingCity" id="listing-city-label">
                  City
                </FormLabel>
                <Input
                  aria-label="listing-city"
                  id="listing-city"
                  type="text"
                  onChange={(e) => setListingCity(e.target.value)}
                  value={listingCity}
                />
              </Box>
              <Box mt={4}>
                <FormLabel
                  htmlFor="listingProvince"
                  id="listing-province-label"
                >
                  Province
                </FormLabel>
                <Select
                  aria-label="listing-province"
                  id="listing-province-selector"
                  onChange={(e) => {
                    setListingProvince(e.target.value);
                  }}
                  value={listingProvince}
                  placeholder=""
                >
                  {provinces.map((p) => (
                    <option key={p.code}>{p.code}</option>
                  ))}
                </Select>
              </Box>

              <Box maxW="230px" mt={4}>
                <FormLabel htmlFor="listingPrice" id="listing-price-label">
                  Min Price
                </FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon as={BsCurrencyDollar} color="gray.400" />
                  </InputLeftElement>
                  <Input
                    aria-label="listing-price"
                    id="listing-price"
                    type="number"
                    onChange={(e) => setMinListingPrice(e.target.value)}
                    value={minListingPrice}
                    step="0.01"
                  />
                </InputGroup>
              </Box>
              <Box maxW="230px" mt={4}>
                <FormLabel htmlFor="listingPrice" id="listing-price-label">
                  Max Price
                </FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon as={BsCurrencyDollar} color="gray.400" />
                  </InputLeftElement>
                  <Input
                    aria-label="listing-price"
                    id="listing-price"
                    type="number"
                    onChange={(e) => setMaxListingPrice(e.target.value)}
                    value={maxListingPrice}
                    step="0.01"
                  />
                </InputGroup>
              </Box>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={clearFilters}>
              clear
            </Button>
            <Button colorScheme="teal" onClick={handleOnSubmit}>
              Apply
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Text fontSize="36px" fontWeight="bold" mb="6">
        Search
      </Text>
      <Box
        id="listingForm"
        p={[3, 6]}
        w={['100%', '500px']}
        borderWidth="1px"
        borderRadius="lg"
        mb={12}
      >
        <FormControl>
          <Flex>
            <Input
              aria-label="search-value"
              id="search-value"
              type="text"
              placeholder="Search"
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Button
              aria-label="submit-button"
              colorScheme="teal"
              fontWeight="semibold"
              onClick={handleOnSubmit}
              ml={8}
            >
              <Search2Icon />
            </Button>

            <Button
              aria-label="submit-button"
              colorScheme="teal"
              fontWeight="semibold"
              onClick={onOpen}
              ml={2}
            >
              <SettingsIcon />
            </Button>
          </Flex>
        </FormControl>
      </Box>
      {renderListings}
    </Center>
  );
}

export default SearchPage;

SearchPage.propTypes = {
  title: PropTypes.string,
  condition: PropTypes.string,
  category: PropTypes.string,
  city: PropTypes.string,
  province: PropTypes.string,
  minPrice: PropTypes.number,
  maxPrice: PropTypes.number,
  error: PropTypes.string,
};

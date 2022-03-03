import mockAdListings from '../__mocks__/mockAdListing';
import { AdListingCard } from '../components';

function searchPage() {
  return (
    <div>
      {' '}
      <AdListingCard {...mockAdListings[0]} />
    </div>
  );
}

export default searchPage;

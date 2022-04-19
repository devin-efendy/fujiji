import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import getConfig from 'next/config';
import { Button, Spinner } from '@chakra-ui/react';
import PropTypes from 'prop-types';

export default function StripeCheckoutButton({ boostPackageName, boostPackagePrice, boostPackageID }) {
  const [loading, setLoading] = useState(false);

  const { publicRuntimeConfig } = getConfig();
  const publishableKey = `${publicRuntimeConfig.STRIPE_PUBLISHABLE_KEY}`;
  const stripePromise = loadStripe(publishableKey);
  const createCheckOutSession = async () => {
    setLoading(true);
    const stripe = await stripePromise;
    const checkoutSession = await axios.post(
      '/api/checkout_sessions',
      {
        name: boostPackageName,
        price: boostPackagePrice,
        id: boostPackageID,
      },
    );
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    if (result.error) {
      alert(result.error.message);
    }
    setLoading(false);
  };
  return (
    <div>
      <div className="shadow-lg border rounded p-2 ">
        <Button
          onClick={createCheckOutSession}
          colorScheme="teal"
        >
          {loading ? <Spinner /> : 'Buy'}
        </Button>
      </div>
    </div>
  );
}

StripeCheckoutButton.propTypes = {
  boostPackageID: PropTypes.string,
  boostPackageName: PropTypes.string,
  boostPackagePrice: PropTypes.string,
};

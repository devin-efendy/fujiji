import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const stripe = require('stripe')(publicRuntimeConfig.STRIPE_SECRET_KEY);

export default async function CreateStripeSession(req, res) {
  const { price, name, id } = req.body;

  if (req.method === 'POST') {
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            amount: price * 100,
            name,
            quantity: 1,
            currency: 'cad',
          },
        ],
        mode: 'payment',
        success_url: `${req.headers.referer}/?result=success&packageID=${id}`,
        cancel_url: `${req.headers.referer}/?result=error`,
      });
      res.status(200).json({ id: session.id });
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}

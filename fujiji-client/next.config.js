module.exports = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    FUJIJI_API_URL: process.env.NEXT_PUBLIC_FUJIJI_API_URL,
    JWT_AUTH_TOKEN: process.env.NEXT_PUBLIC_JWT_AUTH_TOKEN,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    SOCKET_URL: process.env.NEXT_PUBLIC_SOCKET_URL,
  },
};

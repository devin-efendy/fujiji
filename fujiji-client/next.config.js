module.exports = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    FUJIJI_API_URL: process.env.NEXT_PUBLIC_FUJIJI_API_URL,
    JWT_AUTH_TOKEN: process.env.NEXT_PUBLIC_JWT_AUTH_TOKEN,
  },
};

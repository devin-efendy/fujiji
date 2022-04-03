module.exports = {
  reactStrictMode: true,
  env: {
    // NOTE: this is exposing environment variables on the client side
    // don't expose secrets to client
    FUJIJI_API_URL: process.env.FUJIJI_API_URL,
    JWT_AUTH_TOKEN: process.env.JWT_AUTH_TOKEN,
  },
   eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

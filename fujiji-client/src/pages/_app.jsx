/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.css';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { PageLayout } from '../components';
import customTheme from '../utils/theme';

const theme = extendTheme(customTheme);

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <PageLayout>
        <Component {...pageProps} />
      </PageLayout>
    </ChakraProvider>
  );
}

export default MyApp;

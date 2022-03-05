/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.css';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { PageLayout } from '../components';
import { SessionProvider } from '../context/session';
import useSessionHook from '../hooks/useSessionHook';
import customTheme from '../utils/theme';

const theme = extendTheme(customTheme);

function MyApp({ Component, pageProps }) {
  const {
    userData, authToken, setCredentials, signOutUser,
  } = useSessionHook();

  return (
    <SessionProvider
      value={{
        isSignedIn: !!userData && !!authToken,
        userData,
        authToken,
        setCredentials,
        signOutUser,
      }}
    >
      <ChakraProvider theme={theme}>
        <PageLayout>
          <Component {...pageProps} />
        </PageLayout>
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;

import { extendTheme } from '@chakra-ui/react';

const colors = {
  primary: {
    100: '#E5FCF1',
    200: '#27EF96',
    300: '#10DE82',
    400: '#0EBE6F',
    500: '#319795',
    600: '#2C7A7B',
    700: '#086F42',
    800: '#075C37',
    900: '#064C2E',
  },
};

const customTheme = extendTheme({ colors });

export default customTheme;

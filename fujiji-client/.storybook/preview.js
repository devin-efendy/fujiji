const customViewports = {
  iphoneSe: {
    name: 'iPhone SE',
    styles: {
      width: '375px',
      height: '667px',
    },
  },
  iphoneXR: {
    name: 'iPhone XR',
    styles: {
      width: '414px',
      height: '896px',
    },
  },
  samsungGalaxyS8: {
    name: 'Samsung Galaxy S8+',
    styles: {
      width: '360px',
      height: '740px',
    },
  },
  ipadMini: {
    name: 'iPad Mini',
    styles: {
      width: '768px',
      height: '1024px',
    },
  },
  ipadPro10: {
    name: 'iPad Pro 10"',
    styles: {
      width: '834px',
      height: '1112px',
    },
  },
};

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: { viewports: customViewports },
};

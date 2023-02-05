import { theme as chakraTheme } from '@chakra-ui/react';

const fonts = { ...chakraTheme.fonts, mono: `'Menlo', monospace` };

const breakpoints = {
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  '2xl': '96em',
};

const theme = {
  ...chakraTheme,
  colors: {
    ...chakraTheme.colors,
    teal: {
      ...chakraTheme.colors,
      '400': '#6d9a7f',
    },
    black: '#16161D',
  },
  fonts,
};

export default theme;

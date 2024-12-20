import { PaletteOptions } from '@mui/material';

export const lightBrownPalette: PaletteOptions = {
  mode: 'light',
  common: {
    white: '#ffffff',
    black: '#030303',
  },
  text: {
    primary: '#333333',
    secondary: '#ffffff',
    disabled: '#40423a',
  },
  primary: {
    main: '#715846',
    light: '#c4a380',
  },
  secondary: {
    main: '#595953',
    light: '#e9e9e9',
  },
  error: {
    main: '#ea0b0b',
    light: '#f38181',
  },
  warning: {
    main: '#ea770b',
    light: '#f3b881',
  },
  info: {
    main: '#ffeb3b',
    light: '#fff49a',
  },
  success: {
    main: '#2cb563',
    light: '#92d8af',
  },
  button: {
    primary: {
      hover: '#795548',
      focus: '#5d4037',
      active: '#3e2723',
    },
    warning: {
      hover: '#d66e0b',
      focus: '#c96707',
      active: '#bb5f07',
    },
    error: {
      hover: '#be0909',
      focus: '#b00808',
      active: '#7a0606',
    },
    success: {
      hover: '#23904f',
      focus: '#208448',
      active: '#15572f',
    },
    secondary: {
      outlined: {
        hover: '#f5f5f5',
        focus: '#ebebeb',
        active: '#c2c2c2',
        border: '#dddddd',
      },
      contained: {
        hover: '#151515',
        focus: '#131313',
        active: '#353535',
      },
    },
  },
  acceptable: {
    main: '#ffeb3b',
    light: '#fff49a',
  },
};

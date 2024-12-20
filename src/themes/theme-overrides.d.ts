import {
  PaletteOptions as BasePaletteOptions,
  Palette as BasePalette,
  PaletteColor,
  PaletteColorOptions,
} from '@mui/material';

export interface Color {
  hover: string;
  focus: string;
  active: string;
}

interface ButtonPaletteColors {
  primary: Color;
  warning: Color;
  error: Color;
  success: Color;
  secondary: {
    contained: Color;
    outlined: Color & { border: string };
  };
}

declare module '@mui/material' {
  interface PaletteOptions extends BasePaletteOptions {
    button: ButtonPaletteColors;
    acceptable: PaletteColorOptions;
  }

  interface Palette extends BasePalette {
    button: ButtonPaletteColors;
    acceptable: PaletteColor;
  }
}

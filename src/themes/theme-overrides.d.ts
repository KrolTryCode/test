import {
  PaletteOptions as BasePaletteOptions,
  Palette as BasePalette,
  PaletteColor,
  PaletteColorOptions,
} from '@mui/material';

declare module '@mui/material' {
  interface PaletteOptions extends BasePaletteOptions {
    acceptable: PaletteColorOptions;
  }

  interface Palette extends BasePalette {
    acceptable: PaletteColor;
  }
}

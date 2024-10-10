/* eslint-disable import/no-empty-named-blocks */
import { createTheme, CssBaseline } from '@mui/material';
import ThemeProvider, { ThemeProviderProps } from '@mui/material/styles/ThemeProvider';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDateFns } from '@mui/x-date-pickers-pro/AdapterDateFnsV3';
import { FC, useMemo } from 'react';
import type {} from '@mui/lab/themeAugmentation';
import type {} from '@mui/x-data-grid/themeAugmentation';
import type {} from '@mui/x-tree-view/themeAugmentation';
import type {} from '@mui/x-date-pickers-pro/themeAugmentation';
import './fonts.scss';
import { useTranslation } from 'react-i18next';

import { getGridLocales } from './locales';
import { themeOptions } from './theme';

export const MuiThemeProvider: FC<Omit<ThemeProviderProps, 'theme'>> = ({ children }) => {
  const { i18n } = useTranslation();

  const language = i18n.language;

  const locales = useMemo(() => getGridLocales(language), [language]);

  const theme = useMemo(() => createTheme(themeOptions, ...Object.values(locales)), [locales]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={locales.datePickerLocale}>
        {children}
      </LocalizationProvider>
    </ThemeProvider>
  );
};

/* eslint-disable import/no-empty-named-blocks */
import { createTheme, CssBaseline } from '@mui/material';
import { ruRU, enUS } from '@mui/material/locale';
import ThemeProvider, { ThemeProviderProps } from '@mui/material/styles/ThemeProvider';
import { GridLocaleText } from '@mui/x-data-grid-premium';
import { ruRU as ruGridLocale, enUS as enGridLocale } from '@mui/x-data-grid-premium/locales';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDateFns } from '@mui/x-date-pickers-pro/AdapterDateFnsV3';
import {
  ruRU as ruDatePickerLocaleTexts,
  enUS as enDatePickerLocaleTexts,
} from '@mui/x-date-pickers-pro/locales';
import { enUS as enDatePickerLocale } from 'date-fns/locale/en-US';
import { ru as ruDatePickerLocale } from 'date-fns/locale/ru';
import { FC, useMemo } from 'react';
import type {} from '@mui/lab/themeAugmentation';
import type {} from '@mui/x-data-grid/themeAugmentation';
import type {} from '@mui/x-tree-view/themeAugmentation';
import type {} from '@mui/x-date-pickers-pro/themeAugmentation';
import './fonts.scss';
import { useTranslation } from 'react-i18next';

import { themeOptions } from './theme';

//#region ru grid translation patch

/* TODO:
  законтрибьютить или подождать, пока это не сделает кто-то другой
  https://github.com/mui/mui-x/blob/master/packages/x-data-grid/src/locales/ruRU.ts#L50
*/

ruGridLocale.components.MuiDataGrid.defaultProps.localeText.columnsManagementSearchTitle = 'Поиск';
ruGridLocale.components.MuiDataGrid.defaultProps.localeText.columnsManagementNoColumns =
  'Нет столбцов';
ruGridLocale.components.MuiDataGrid.defaultProps.localeText.columnsManagementShowHideAllText =
  'Показать/Скрыть все';
ruGridLocale.components.MuiDataGrid.defaultProps.localeText.filterOperatorIsEmpty =
  'пустое значение';

//#endregion

export const MuiThemeProvider: FC<Omit<ThemeProviderProps, 'theme'>> = ({ children }) => {
  const { i18n } = useTranslation();

  const language = i18n.language;

  const locales = useMemo(() => {
    const gridLocale = language === 'en' ? enGridLocale : ruGridLocale;

    return {
      locale: language === 'en' ? enUS : ruRU,
      datePickerLocale: language === 'en' ? enDatePickerLocale : ruDatePickerLocale,
      datePickerLocaleTexts: language === 'en' ? enDatePickerLocaleTexts : ruDatePickerLocaleTexts,
      gridLocale: overrideGridFiltersLocalization(gridLocale),
    };
  }, [language]);

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

function overrideGridFiltersLocalization(baseLocale: typeof ruGridLocale): typeof ruGridLocale {
  let localeText: Partial<GridLocaleText> = {
    ...baseLocale.components.MuiDataGrid.defaultProps.localeText,
  };

  const numTextReplacement: Partial<Record<keyof GridLocaleText, keyof GridLocaleText>> = {
    'filterOperator=': 'filterOperatorEquals',
    'filterOperator!=': 'filterOperatorNot',
    'filterOperator>': 'filterOperatorAfter',
    'filterOperator>=': 'filterOperatorOnOrAfter',
    'filterOperator<': 'filterOperatorBefore',
    'filterOperator<=': 'filterOperatorOnOrBefore',
  };

  Object.entries(numTextReplacement).map(([key, val]) => {
    localeText = {
      ...localeText,
      [key]: baseLocale.components.MuiDataGrid.defaultProps.localeText[val],
    };
  });

  return { components: { MuiDataGrid: { defaultProps: { localeText } } } };
}

import { ruRU, enUS } from '@mui/material/locale';
import { GridLocaleText } from '@mui/x-data-grid-premium';
import { ruRU as ruGridLocale, enUS as enGridLocale } from '@mui/x-data-grid-premium/locales';
import {
  ruRU as ruDatePickerLocaleTexts,
  enUS as enDatePickerLocaleTexts,
} from '@mui/x-date-pickers-pro/locales';
import { enUS as enDatePickerLocale } from 'date-fns/locale/en-US';
import { ru as ruDatePickerLocale } from 'date-fns/locale/ru';

export const getGridLocales = (language: string) => {
  const gridLocale = language === 'en' ? enGridLocale : overrideRuLocalization(ruGridLocale);

  return {
    locale: language === 'en' ? enUS : ruRU,
    datePickerLocale: language === 'en' ? enDatePickerLocale : ruDatePickerLocale,
    datePickerLocaleTexts: language === 'en' ? enDatePickerLocaleTexts : ruDatePickerLocaleTexts,
    gridLocale: overrideGridFiltersLocalization(gridLocale),
  };
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

// https://github.com/mui/mui-x/blob/master/packages/x-data-grid/src/locales/ruRU.ts
function overrideRuLocalization(baseLocale: typeof ruGridLocale): typeof ruGridLocale {
  const localeText: Partial<GridLocaleText> = {
    ...baseLocale.components.MuiDataGrid.defaultProps.localeText,
    columnsManagementShowHideAllText: 'Показать/Скрыть все',
    filterOperatorIsEmpty: 'пустое значение',
  };

  return { components: { MuiDataGrid: { defaultProps: { localeText } } } };
}

import { isDate } from 'date-fns';
import i18n, { t } from 'i18next';

import { ColumnEnhancer } from '~/ui-components/datagrid/datagrid.types';
import { getGridCommonDateOperators } from '~/ui-components/datagrid/filters/filter-operators';

export const enhanceDateTimeColDef: ColumnEnhancer = (colDef, passedColDef, pagingMode) => {
  if (colDef.type === 'date') {
    const dateStyle = passedColDef.dateTimeFormatOptions?.dateStyle ?? 'short';
    passedColDef.dateTimeFormatOptions = { ...passedColDef.dateTimeFormatOptions, dateStyle };
  }

  colDef.groupingValueGetter = value => {
    if (value && isDate(new Date(value))) {
      return new Date(value).toLocaleString(i18n.language, passedColDef.dateTimeFormatOptions);
    }
    return t('STATUS.UNDEFINED');
  };

  colDef.valueGetter =
    passedColDef.valueGetter ??
    ((value: unknown) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return typeof value === 'string' || typeof value === 'number' ? new Date(value) : value;
    });

  colDef.valueFormatter =
    passedColDef.valueFormatter ??
    ((value: unknown) => {
      if (passedColDef.valueGetter) {
        return value;
      }
      if (value instanceof Date) {
        return value.toLocaleString(i18n.language, passedColDef.dateTimeFormatOptions);
      }

      return '';
    });

  colDef.filterOperators = getGridCommonDateOperators(passedColDef, pagingMode);
};

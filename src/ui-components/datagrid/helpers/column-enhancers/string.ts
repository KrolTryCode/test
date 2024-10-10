import { t } from 'i18next';

import { ColumnEnhancer } from '~/ui-components/datagrid/datagrid.types';
import { getGridCommonStringOperators } from '~/ui-components/datagrid/filters/filter-operators';

export const enhanceStringColDef: ColumnEnhancer = (colDef, passedColDef, pagingMode) => {
  colDef.filterOperators = getGridCommonStringOperators(pagingMode);
  if (!passedColDef.groupingValueGetter) {
    colDef.groupingValueGetter = value => value ?? t('STATUS.UNDEFINED');
  }
};

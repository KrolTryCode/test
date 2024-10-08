import { t } from 'i18next';

import { ColumnEnhancer } from '~/ui-components/datagrid/datagrid.types';
import { getGridCommonStringOperators } from '~/ui-components/datagrid/filters/filter-operators';

export const enhanceStringColDef: ColumnEnhancer = (colDef, _passedColDef, pagingMode) => {
  colDef.filterOperators = getGridCommonStringOperators(pagingMode);
  colDef.groupingValueGetter = value => value ?? t('STATUS.UNDEFINED');
};

import { t } from 'i18next';

import { ColumnEnhancer } from '~/ui-components/datagrid/datagrid.types';
import { getGridCommonNumericOperators } from '~/ui-components/datagrid/filters/filter-operators';

export const enhanceNumberColDef: ColumnEnhancer = (colDef, _passedColDef) => {
  colDef.valueFormatter = (value: number) => `${value ?? ''}`;
  colDef.filterOperators = getGridCommonNumericOperators();
  colDef.headerAlign = 'left';
  colDef.align = 'left';
  colDef.groupingValueGetter = value => value ?? t('STATUS.UNDEFINED');
};

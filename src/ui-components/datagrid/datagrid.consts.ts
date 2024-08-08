import { DataGridPremiumProps } from '@mui/x-data-grid-premium';

import { GridPagingParams } from '~/ui-components/datagrid/datagrid.types';

export const gridCustomDefaultProps: Partial<DataGridPremiumProps> = {
  disableAggregation: true,
  getDetailPanelHeight: () => 'auto',
  rowGroupingColumnMode: 'multiple',
  defaultGroupingExpansionDepth: -1,
  // other props moved to src\themes\components\data-grid.ts
};

export const DEFAULT_GRID_PAGING_PARAMS: Required<GridPagingParams> = {
  filterModel: { items: [] },
  paginationModel: { page: 0, pageSize: 20 },
  sortModel: [],
  groupingModel: [],
};

import type { GridColumnsPanelProps } from '@mui/x-data-grid/components/panel/GridColumnsPanel';
import {
  GridColumnGroupingModel,
  GridPanelContent,
  GridPanelWrapper,
  useGridApiContext,
} from '@mui/x-data-grid-premium';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';

import { EnhancedColDef } from '~/ui-components/datagrid/datagrid.types';
import { serviceRowGroupPrefix } from '~/ui-components/datagrid/datagrid.utils';
import { ColumnsList } from '~/ui-components/datagrid/slots/toolbar/columns-panel/columns-list.component';
import { SearchColumns } from '~/ui-components/datagrid/slots/toolbar/columns-panel/search-columns.component';
import { ToggleAllButton } from '~/ui-components/datagrid/slots/toolbar/columns-panel/toggle-all-button.component';

export interface ColumnsPanelProps extends GridColumnsPanelProps {
  columnGroupingModel?: GridColumnGroupingModel;
}

export type ColumnAndGroup = EnhancedColDef & {
  columnGroups: string[];
  columnGroupName: string;
};

export const ColumnsPanel: FC<ColumnsPanelProps> = ({ columnGroupingModel }) => {
  const [searchText, setSearchText] = useState('');
  const { current: gridApi } = useGridApiContext();
  const columns = gridApi.getAllColumns();
  const groupsList = gridApi.getAllGroupDetails();
  const visibleColumns = gridApi.getVisibleColumns().filter(column => column.hideable);
  const hideableColumns = useMemo(() => columns.filter(column => column.hideable), [columns]);
  const groupedColumnFields = useMemo(
    () =>
      hideableColumns
        .filter(col => col.field.startsWith(serviceRowGroupPrefix))
        .map(col => col.field.replace(new RegExp(`^${serviceRowGroupPrefix}|_`, 'g'), '')),
    [hideableColumns],
  );

  const toggleableColumns = useMemo((): ColumnAndGroup[] | undefined => {
    return hideableColumns
      .filter(col => !col.field.startsWith(serviceRowGroupPrefix))
      .map(column => {
        const columnGroupPath = gridApi.getColumnGroupPath(column.field);
        const columnGroupNames = columnGroupPath.map(uuid => groupsList[uuid].headerName ?? '');

        return {
          ...column,
          columnGroups: columnGroupPath,
          columnGroupName: columnGroupNames.join(' '),
          hideable: !groupedColumnFields.includes(column.field),
        };
      });
  }, [hideableColumns, gridApi, groupedColumnFields, groupsList]);

  const [filteredColumns, setFilteredColumns] = useState(toggleableColumns);

  useEffect(() => {
    setFilteredColumns(
      toggleableColumns?.filter(
        column =>
          (column.headerName?.toLowerCase().includes(searchText.toLowerCase()) ?? false) ||
          (column.columnGroupName.toLowerCase().includes(searchText.toLowerCase()) ?? false),
      ),
    );
  }, [searchText, toggleableColumns]);

  const handleShowHideAll = useCallback(
    (isVisible: boolean) => {
      toggleableColumns?.map(column =>
        gridApi.setColumnVisibility(column.field, column.hideable === true && isVisible),
      );
    },
    [gridApi, toggleableColumns],
  );

  return (
    <GridPanelWrapper>
      <SearchColumns searchText={searchText} onChange={setSearchText} />
      <GridPanelContent>
        <ColumnsList
          columnGroupingModel={columnGroupingModel ?? []}
          filteredColumns={filteredColumns ?? []}
        />
      </GridPanelContent>
      {filteredColumns?.length !== 0 && (
        <ToggleAllButton
          hideableColumnsLength={hideableColumns.length}
          groupedColumnFieldsLength={groupedColumnFields.length}
          visibleColumnsLength={visibleColumns.length}
          onClick={handleShowHideAll}
        />
      )}
    </GridPanelWrapper>
  );
};

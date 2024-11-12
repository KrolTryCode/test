import { Typography } from '@mui/material';
import {
  GridEventListener,
  GridRowEditStopReasons,
  GridRowOrderChangeParams,
  useGridApiRef,
} from '@mui/x-data-grid-premium';
import {
  notifySuccess,
  EnhancedColDef,
  GridPagingParams,
  AddEntity,
  useGetRowActions,
} from '@pspod/ui-components';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { useGetContentNode } from '~/api/queries/nodes/get-content-node.query';
import { useGetNodeColumns } from '~/api/queries/nodes/structure/get-node-columns.query';
import { ColumnMetadataExtended, selectNodeColumns } from '~/api/selectors/select-node-columns';
import { ColumnType } from '~/api/utils/api-requests';
import { DataGrid } from '~/components/datagrid/datagrid.component';
import { useTableStructureActions } from '~/pages/tables/table-structure/use-table-structure-actions.hook';
import { reorderRows } from '~/utils/datagrid/reorder-rows';
import { showErrorMessage } from '~/utils/show-error-message';

const TableStructure: FC = () => {
  const apiRef = useGridApiRef();
  const { t } = useTranslation();
  const { nodeId = '' } = useParams();
  const { data: nodeInfo, isLoading: isNodeLoading } = useGetContentNode(nodeId);
  const {
    data: nodeColumns,
    isLoading: isColumnsLoading,
    isFetched: isColumnsFetched,
  } = useGetNodeColumns(nodeId, {
    select: selectNodeColumns,
  });

  const { handleDropColumn, handleAddColumn, handleEditColumn } = useTableStructureActions(nodeId);
  const { getActions, onRowModesModelChange, rowModesModel } =
    useGetRowActions<ColumnMetadataExtended>(apiRef, (row: ColumnMetadataExtended) =>
      handleDropColumn(row.name),
    );

  const [paging, setGridPaging] = useState<GridPagingParams>();
  const [items, setItems] = useState(nodeColumns);

  useEffect(() => {
    setItems(nodeColumns);
  }, [isColumnsFetched, nodeColumns]);

  const changeTableColumn = useCallback(
    async (
      { name }: ColumnMetadataExtended,
      oldRow: ColumnMetadataExtended,
    ): Promise<ColumnMetadataExtended> => {
      const isNameChanged = name !== oldRow.name;
      if (!isNameChanged) {
        return oldRow;
      }

      try {
        await handleEditColumn({ columnName: oldRow.name, newColumnName: name });
        notifySuccess(t('MESSAGE.UPDATE_SUCCESS'));
        return {
          ...oldRow,
          name: name,
        };
      } catch (e) {
        showErrorMessage(e, 'ERROR.UPDATE_FAILED');
        return oldRow;
      }
    },
    [handleEditColumn, t],
  );

  const structureTableColumns: EnhancedColDef<ColumnMetadataExtended>[] = useMemo(
    () => [
      {
        field: 'name',
        headerName: t('COMMON.TITLE'),
        flex: 1,
        editable: true,
      },
      {
        field: 'type',
        headerName: t('STRUCTURE.TYPE'),
        flex: 1,
        type: 'singleSelect',
        valueOptions: Object.values(ColumnType),
      },
      // TODO API, определить формат данных
      // {
      //   field: 'validValues',
      //   headerName: t('STRUCTURE.VALID_VALUES'),
      //   minWidth: 200,
      //   editable: true,
      //   flex: 1,
      // },
      {
        field: 'isPrimaryKey',
        headerName: t('STRUCTURE.UNIQUE_FIELD'),
        width: 150,
        type: 'boolean',
      },
      {
        field: 'requiredField',
        headerName: t('STRUCTURE.REQUIRED_FIELD'),
        width: 150,
        type: 'boolean',
      },
      {
        field: 'actions',
        type: 'actions',
        width: 82,
        getActions,
      },
    ],
    [getActions, t],
  );

  const onRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.enterKeyDown) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleRowOrderChange = async (params: GridRowOrderChangeParams) => {
    const newRows = reorderRows(params.oldIndex, params.targetIndex, items ?? []);
    setItems(newRows);
    // TODO: update column list
  };

  return (
    <>
      <Typography variant={'h3'} color={'primary'}>
        {`${t('STRUCTURE.LIST')} ${nodeInfo?.name}`}
      </Typography>

      <DataGrid<ColumnMetadataExtended>
        ref={apiRef}
        loading={isColumnsLoading || isNodeLoading}
        items={items ?? []}
        totalCount={items?.length ?? 0}
        editMode={'row'}
        columns={structureTableColumns}
        processRowUpdate={changeTableColumn}
        rowModesModel={rowModesModel}
        onRowModesModelChange={onRowModesModelChange}
        onRowEditStop={onRowEditStop}
        paging={paging}
        onPagingChanged={setGridPaging}
        onRowOrderChange={handleRowOrderChange}
        rowReordering
        hasWidthSaving={false}
        hasColumnChooser={false}
        customToolbarContent={<AddEntity onClick={handleAddColumn} />}
      />
    </>
  );
};

export default TableStructure;

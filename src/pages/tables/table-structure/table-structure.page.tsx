import { Typography } from '@mui/material';
import { GridEventListener, GridRowEditStopReasons, useGridApiRef } from '@mui/x-data-grid-premium';
import { FC, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { useGetContentNode } from '~/api/queries/nodes/get-content-node.query';
import { useGetNodeColumns } from '~/api/queries/nodes/structure/get-node-columns.query';
import { ColumnMetadataWithId, selectNodeColumns } from '~/api/selectors/select-node-columns';
import { ColumnDefinitionColumnTypeEnum } from '~/api/utils/api-requests';
import { useTableStructureActions } from '~/pages/tables/table-structure/use-table-structure-actions.hook';
import { DataGrid } from '~/ui-components/datagrid/datagrid.component';
import { EnhancedColDef, GridPagingParams } from '~/ui-components/datagrid/datagrid.types';
import { AddEntity } from '~/ui-components/datagrid/slots/toolbar/add/add-entity.component';
import { useGetRowActions } from '~/ui-components/datagrid/use-get-grid-row-actions.hook';
import { notifySuccess } from '~/ui-components/notifications/notifications';
import { showErrorMessage } from '~/utils/show-error-message';

const TableStructure: FC = () => {
  const apiRef = useGridApiRef();
  const { t } = useTranslation();
  const { nodeId = '' } = useParams();
  const { data: nodeInfo, isLoading: isNodeLoading } = useGetContentNode(nodeId);
  const { data: nodeColumns, isLoading: isColumnsLoading } = useGetNodeColumns(nodeId, {
    select: selectNodeColumns,
  });

  const { handleDropColumn, handleAddColumn, handleEditColumn } = useTableStructureActions(nodeId);
  const { getActions, onRowModesModelChange, rowModesModel } =
    useGetRowActions<ColumnMetadataWithId>(apiRef, handleDropColumn, 'name');

  const [paging, setGridPaging] = useState<GridPagingParams>();

  const changeColumn = useCallback(
    async (
      { name }: ColumnMetadataWithId,
      oldRow: ColumnMetadataWithId,
    ): Promise<ColumnMetadataWithId> => {
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

  const structureTableColumns: EnhancedColDef<ColumnMetadataWithId>[] = useMemo(
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
        valueOptions: Object.values(ColumnDefinitionColumnTypeEnum),
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
        width: 80,
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

  return (
    <>
      <Typography variant={'h3'} color={'primary'}>
        {`${t('STRUCTURE.LIST')} ${nodeInfo?.name}`}
      </Typography>

      <DataGrid<ColumnMetadataWithId>
        ref={apiRef}
        loading={isColumnsLoading || isNodeLoading}
        items={nodeColumns ?? []}
        totalCount={nodeColumns?.length ?? 0}
        editMode={'row'}
        columns={structureTableColumns}
        processRowUpdate={changeColumn}
        rowModesModel={rowModesModel}
        onRowModesModelChange={onRowModesModelChange}
        onRowEditStop={onRowEditStop}
        paging={paging}
        onPagingChanged={setGridPaging}
        rowReordering
        hasWidthSaving={false}
        hasColumnChooser={false}
        customToolbarContent={<AddEntity onClick={handleAddColumn} />}
      />
    </>
  );
};

export default TableStructure;

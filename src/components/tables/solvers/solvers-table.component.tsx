import { Upload, Edit as EditIcon, Download, DeleteOutline } from '@mui/icons-material';
import { Chip } from '@mui/material';
import { GridActionsCellItem, GridRenderCellParams } from '@mui/x-data-grid-premium';
import { AddEntity, Button, DataGrid, EnhancedColDef } from '@pspod/ui-components';
import { FC, useMemo } from 'react';

import { useGetSolversQuery } from '~/api/queries/solvers/get-solvers.query';
import { Solver } from '~/api/utils/api-requests';
import { useCustomTranslations } from '~/utils/hooks';

import { useSolverActions } from './solvers-table.hook';

interface SolversTableProps {
  projectId: string;
}

export const SolversTable: FC<SolversTableProps> = ({ projectId }) => {
  const { t, translateStatus } = useCustomTranslations();
  const {
    handleCreateSolver,
    handleDeleteSolver,
    handleUpdateSolver,
    handleImportSolver,
    handleExportSolver,
  } = useSolverActions(projectId);

  const { data = [], isLoading } = useGetSolversQuery(projectId);

  // TODO BE-145 authorName https://tracker.yandex.ru/BE-145

  const columns = useMemo<EnhancedColDef<Solver>[]>(
    () => [
      {
        field: 'name',
        headerName: t('COMMON.TITLE'),
        flex: 1,
      },
      {
        field: 'description',
        headerName: t('COMMON.DESCRIPTION'),
        flex: 1,
      },
      {
        field: 'authorId',
        headerName: t('COMMON.AUTHOR'),
        flex: 1,
        // valueGetter: (_, row) => row.author,
        // groupingValueGetter: (_, row) => row.author,
      },
      {
        field: 'created',
        type: 'dateTime',
        headerName: t('COMMON.DATE_CREATED'),
        flex: 1,
      },
      {
        field: 'active',
        headerName: t('COMMON.STATUS'),
        renderCell: renderStatusCell,
        type: 'singleSelect',
        valueOptions() {
          return [
            { value: true, label: translateStatus('ACTIVE') },
            { value: false, label: translateStatus('ARCHIVED') },
          ];
        },
        groupingValueGetter: value =>
          value ? translateStatus('ACTIVE') : translateStatus('ARCHIVED'),
      },
      {
        field: 'actions',
        type: 'actions',
        width: 100,
        getActions({ row }) {
          return [
            <GridActionsCellItem
              key={'edit'}
              label={t('ACTION.EDIT', {
                type: t('ENTITY.SOLVER').toLowerCase(),
              })}
              title={t('ACTION.EDIT', {
                type: t('ENTITY.SOLVER').toLowerCase(),
              })}
              icon={<EditIcon />}
              color={'primary'}
              onClick={() => handleUpdateSolver(row)}
            />,
            <GridActionsCellItem
              key={'delete'}
              label={t('ACTION.DELETE', {
                type: t('ENTITY.SOLVER').toLowerCase(),
              })}
              title={t('ACTION.DELETE', {
                type: t('ENTITY.SOLVER').toLowerCase(),
              })}
              icon={<DeleteOutline />}
              color={'error'}
              onClick={() => handleDeleteSolver(row.id!)}
            />,
          ];
        },
      },
    ],
    [handleDeleteSolver, handleUpdateSolver, t, translateStatus],
  );

  const ToolbarContent = (
    <>
      <AddEntity onClick={handleCreateSolver} />
      <Button
        disabled
        size={'medium'}
        color={'primary'}
        title={t('ACTION.IMPORT', { what: t('ENTITY.SOLVER').toLowerCase() })}
        onClick={handleImportSolver}
        variant={'text'}
        icon={<Upload />}
      >
        {t('ACTION.IMPORT')}
      </Button>
      <Button
        disabled
        size={'medium'}
        color={'primary'}
        title={t('ACTION.EXPORT', { what: t('ENTITY.SOLVER').toLowerCase() })}
        onClick={handleExportSolver}
        variant={'text'}
        icon={<Download />}
      >
        {t('ACTION.EXPORT')}
      </Button>
    </>
  );

  return (
    <DataGrid
      items={data}
      totalCount={data.length ?? 0}
      columns={columns}
      loading={isLoading}
      pinnedColumns={{ right: ['actions'] }}
      customToolbarContent={ToolbarContent}
    />
  );
};

function renderStatusCell(params: GridRenderCellParams<Solver, Solver['active']>) {
  if (params.value === undefined) {
    return '';
  }

  if (params.rowNode.type === 'group') {
    return params.formattedValue;
  }

  return (
    <Chip
      label={params.formattedValue}
      color={params.value ? 'success' : 'error'}
      variant={'outlined'}
    />
  );
}

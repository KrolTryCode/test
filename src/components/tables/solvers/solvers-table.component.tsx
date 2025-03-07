import { Upload, Edit as EditIcon, Download, DeleteOutline } from '@mui/icons-material';
import { Box, Chip } from '@mui/material';
import { GridActionsCellItem, GridRenderCellParams } from '@mui/x-data-grid-premium';
import { AddEntity, Button, DataGrid, EnhancedColDef } from '@pspod/ui-components';
import { getRouteApi } from '@tanstack/react-router';
import { FC, useMemo } from 'react';

import { Solver } from '~/api/utils/api-requests';
import { SolverFileCard } from '~/components/solver-file-card/solver-file-card.component';
import { useCustomTranslations } from '~/utils/hooks';

import { useSolverActions } from './solvers-table.hook';

export const SolversTable: FC = () => {
  const { t, translateStatus } = useCustomTranslations();

  const route = getRouteApi('/_main/projects/project/$projectId/solvers/');
  const { solvers } = route.useLoaderData();
  const { projectId } = route.useParams();

  const {
    handleCreateSolver,
    handleDeleteSolver,
    handleUpdateSolver,
    handleImportSolver,
    handleExportSolver,
  } = useSolverActions(projectId);

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
        valueGetter: (_, row) => row.authorName,
        groupingValueGetter: (_, row) => row.authorName,
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
        field: 'fileInfo',
        headerName: t('FILES.INFO'),
        width: 280,
        sortable: false,
        aggregable: false,
        filterable: false,
        groupable: false,
        type: 'custom',
        renderCell: ({ row, rowNode }: GridRenderCellParams<Solver>) => {
          if (rowNode.type !== 'group') {
            return (
              <Box sx={{ width: 'calc(100% + 16px)', margin: '-8px' }}>
                <SolverFileCard solverId={row.id!} size={'small'} />
              </Box>
            );
          }
        },
      },
      {
        field: 'actions',
        type: 'actions',
        width: 84,
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
              label={t('ACTION.DELETE')}
              title={t('ACTION.DELETE')}
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
      items={solvers}
      totalCount={solvers.length ?? 0}
      columns={columns}
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

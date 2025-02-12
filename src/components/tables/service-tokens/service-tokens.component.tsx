import { Box, Chip, ChipProps } from '@mui/material';
import { GridRenderCellParams } from '@mui/x-data-grid-premium';
import { AddEntity, DataGrid, DeleteCellButton, EnhancedColDef } from '@pspod/ui-components';
import { useParams } from '@tanstack/react-router';
import { FC, useMemo } from 'react';

import { ServiceToken, TokenState } from '~/api/utils/api-requests';
import { useCustomTranslations } from '~/utils/hooks';

import { useServiceTokensTable } from './service-tokens.hook';

export const ServiceTokensTable: FC = () => {
  const { t, translateStatus, getStatusValueOptions } = useCustomTranslations();
  const { groupId = '', projectId = '' } = useParams({ strict: false });
  const { tokens, isTokenListLoading, archiveToken, handleGenerateToken } = useServiceTokensTable(
    projectId || groupId,
  );

  const columns = useMemo<EnhancedColDef<ServiceToken>[]>(
    () => [
      {
        field: 'name',
        headerName: t('COMMON.TITLE'),
        flex: 3,
      },
      {
        field: 'description',
        headerName: t('COMMON.DESCRIPTION'),
        flex: 2,
      },
      {
        field: 'authorId',
        headerName: t('COMMON.AUTHOR'),
        flex: 2,
        valueGetter: (_, row) => row.authorName,
        groupingValueGetter: (_, row) => row.authorName,
      },
      {
        field: 'state',
        headerName: t('COMMON.STATUS'),
        flex: 1,
        renderCell: renderStatusCell,
        type: 'singleSelect',
        valueOptions: () => getStatusValueOptions(Object.values(TokenState)),
        groupingValueGetter: value => translateStatus(value),
      },
      {
        field: 'expirationDate',
        type: 'dateTime',
        headerName: t('COMMON.DATE_EXPIRED'),
        flex: 1,
      },
      {
        field: 'actions',
        width: 50,
        type: 'actions',
        disableReorder: true,
        getActions({ row }) {
          return [
            <DeleteCellButton
              key={'delete'}
              disabled={!row.isActive}
              deleteHandler={() => void archiveToken(row.id)}
            />,
          ];
        },
      },
    ],
    [t, getStatusValueOptions, translateStatus, archiveToken],
  );

  return (
    <Box minHeight={'15em'} display={'flex'} flexDirection={'column'}>
      <DataGrid<ServiceToken>
        items={tokens}
        columns={columns}
        loading={isTokenListLoading}
        totalCount={tokens?.length}
        customToolbarContent={
          <AddEntity customText={'ACTION.GENERATE_TOKEN'} onClick={handleGenerateToken} />
        }
      />
    </Box>
  );
};

function renderStatusCell(params: GridRenderCellParams<ServiceToken, ServiceToken['state']>) {
  if (params.value === undefined) {
    return '';
  }

  if (params.rowNode.type === 'group') {
    return params.formattedValue;
  }

  const colors: Record<TokenState, ChipProps['color']> = {
    Active: 'success',
    Archived: 'error',
    Expired: 'warning',
  };

  return <Chip label={params.formattedValue} color={colors[params.value]} variant={'outlined'} />;
}

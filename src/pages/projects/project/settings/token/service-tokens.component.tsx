import { Box, Chip, ChipProps } from '@mui/material';
import { GridRenderCellParams } from '@mui/x-data-grid-premium';
import { AddEntity, DataGrid, DeleteCellButton, EnhancedColDef } from '@pspod/ui-components';
import { FC, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { ServiceToken, TokenState } from '~/api/utils/api-requests';
import { useTokenActions } from '~/pages/projects/project/settings/token/use-token-actions.hook';
import { getColDateWithTz } from '~/utils/datagrid/get-col-date-with-tz';
import { useCustomTranslations } from '~/utils/hooks/use-custom-translations';

export const ServiceTokens: FC = () => {
  const { t } = useTranslation();
  const { translateStatus } = useCustomTranslations();
  const { projectGroupId = '', projectId = '' } = useParams();
  const { tokens, isTokenListLoading, archiveToken, handleGenerateToken } = useTokenActions(
    projectId || projectGroupId,
  );

  const renderStatusCell = useCallback(
    (params: GridRenderCellParams<ServiceToken>) => {
      const status = params.row.state;

      let color: ChipProps['color'] = 'primary';

      switch (status) {
        case TokenState.Active:
          color = 'success';
          break;
        case TokenState.Expired:
          color = 'warning';
          break;
        case TokenState.Archived:
          color = 'error';
      }

      return <Chip label={translateStatus(status)} color={color} variant={'outlined'} />;
    },
    [translateStatus],
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
      },
      {
        field: 'expirationDate',
        type: 'dateTime',
        headerName: t('COMMON.DATE_EXPIRED'),
        flex: 1,
        valueGetter: getColDateWithTz,
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
    [t, renderStatusCell, archiveToken],
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

import EditIcon from '@mui/icons-material/Edit';
import { Box } from '@mui/material';
import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid-premium';
import { FC, useRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { useGetTemplatesQuery } from '~/api/queries/templates/get-templates.query';
import { Template } from '~/api/utils/api-requests';
import { DataGrid } from '~/components/datagrid/datagrid.component';
import { editPath } from '~/utils/configuration/routes-paths';
import { useCustomTranslations } from '~/utils/hooks/use-custom-translations';
import { usePreventedLinks } from '~/utils/hooks/use-prevented-links';

const TemplatesPage: FC = () => {
  const { t } = useTranslation();
  const { translateStatus } = useCustomTranslations();
  const { data: templates, isLoading } = useGetTemplatesQuery();

  const gridWraperRef = useRef<HTMLDivElement>();
  usePreventedLinks(gridWraperRef);

  const columns = useMemo<GridColDef<Template>[]>(
    () => [
      {
        field: 'name',
        headerName: t('COMMON.TITLE'),
        flex: 1,
      },
      {
        field: 'state',
        headerName: t('COMMON.STATE'),
        flex: 1,
        valueFormatter: translateStatus,
      },
      {
        field: 'content',
        headerName: t('COMMON.CONTENT'),
        flex: 3,
        renderCell: params => (
          <Box dangerouslySetInnerHTML={{ __html: params.row.content ?? t('MESSAGE.NO_DATA') }} />
        ),
      },
      {
        field: 'actions',
        width: 50,
        type: 'actions',
        disableReorder: true,
        getActions({ row }) {
          return [
            <GridActionsCellItem
              key={'edit'}
              label={t('ACTION.EDIT')}
              icon={<EditIcon />}
              color={'primary'}
              component={Link}
              // @ts-expect-error types
              to={`${editPath}/${row.id}`}
            />,
          ];
        },
      },
    ],
    [t, translateStatus],
  );

  return (
    <Box height={'100%'} ref={gridWraperRef}>
      <DataGrid<Template>
        loading={isLoading}
        items={templates ?? []}
        columns={columns}
        totalCount={templates?.length}
      />
    </Box>
  );
};

export default TemplatesPage;

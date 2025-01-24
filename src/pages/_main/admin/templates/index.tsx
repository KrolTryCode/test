import EditIcon from '@mui/icons-material/Edit';
import { Box } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid-premium';
import { createFileRoute } from '@tanstack/react-router';
import { useRef, useMemo } from 'react';

import { useGetTemplatesQuery } from '~/api/queries/templates/get-templates.query';
import { Template } from '~/api/utils/api-requests';
import { DataGrid } from '~/components/datagrid/datagrid.component';
import { GridActionsCellItemLink } from '~/components/implicit-links';
import { useCustomTranslations } from '~/utils/hooks/use-custom-translations';
import { usePreventedLinks } from '~/utils/hooks/use-prevented-links';

export const Route = createFileRoute('/_main/admin/templates/')({
  component: TemplatesPage,
});

export function TemplatesPage() {
  const { t, translateStatus } = useCustomTranslations();
  const { data: templates, isLoading } = useGetTemplatesQuery();

  const gridWrapperRef = useRef<HTMLDivElement>();
  usePreventedLinks(gridWrapperRef);

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
          <Box
            dangerouslySetInnerHTML={{
              __html: params.row.content ?? t('MESSAGE.NO_DATA'),
            }}
          />
        ),
      },
      {
        field: 'actions',
        width: 50,
        type: 'actions',
        disableReorder: true,
        getActions({ row }) {
          return [
            <GridActionsCellItemLink
              key={'edit'}
              label={t('ACTION.EDIT')}
              icon={<EditIcon />}
              color={'primary'}
              to={'/admin/templates/$templateId/edit'}
              params={{ templateId: row.id! }}
            />,
          ];
        },
      },
    ],
    [t, translateStatus],
  );

  return (
    <Box height={'100%'} ref={gridWrapperRef}>
      <DataGrid<Template>
        loading={isLoading}
        items={templates ?? []}
        columns={columns}
        totalCount={templates?.length}
      />
    </Box>
  );
}

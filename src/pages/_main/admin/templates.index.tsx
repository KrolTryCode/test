import EditIcon from '@mui/icons-material/Edit';
import { Box } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid-premium';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useRef, useMemo } from 'react';

import { getTemplatesQueryOptions } from '~/api/queries/templates/get-templates.query';
import { Template, TemplateState } from '~/api/utils/api-requests';
import { DataGrid } from '~/components/datagrid/datagrid.component';
import { GridActionsCellItemLink } from '~/components/implicit-links';
import { useCustomTranslations, usePreventedLinks } from '~/utils/hooks';

export const Route = createFileRoute('/_main/admin/templates/')({
  component: TemplatesPage,
});

export function TemplatesPage() {
  const { t, translateStatus, getStatusValueOptions } = useCustomTranslations();
  const { data: templates, isLoading } = useQuery(getTemplatesQueryOptions());

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
        type: 'singleSelect',
        valueOptions: () => getStatusValueOptions(Object.values(TemplateState)),
        groupingValueGetter: translateStatus,
      },
      {
        field: 'content',
        headerName: t('COMMON.CONTENT'),
        flex: 3,
        renderCell: params => (
          <Box
            dangerouslySetInnerHTML={{
              __html:
                params.row.content ?? (params.rowNode.type !== 'group' ? t('MESSAGE.NO_DATA') : ''),
            }}
          />
        ),
        groupable: false,
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
    [getStatusValueOptions, t, translateStatus],
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

import EditIcon from '@mui/icons-material/Edit';
import { Box } from '@mui/material';
import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid-premium';
import { FC, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useGetTemplatesQuery } from '~/api/queries/templates/get-templates.query';
import { Template } from '~/api/utils/api-requests';
import { DataGrid } from '~/ui-components/datagrid/datagrid.component';
import { editPath } from '~/utils/configuration/routes-paths';
import { translateStatus } from '~/utils/translate-status';

const TemplatesPage: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data: templates, isLoading } = useGetTemplatesQuery();

  const handleEditTemplateClick = useCallback(
    (id: string) => {
      navigate(`${editPath}/${id}`);
    },
    [navigate],
  );

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
        valueFormatter(value) {
          return translateStatus(value);
        },
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
              onClick={() => {
                handleEditTemplateClick(row.id as string);
              }}
            />,
          ];
        },
      },
    ],
    [handleEditTemplateClick, t],
  );

  return (
    <DataGrid<Template>
      loading={isLoading}
      items={templates ?? []}
      columns={columns}
      totalCount={templates?.length}
    />
  );
};

export default TemplatesPage;

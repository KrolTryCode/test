// src/components/tables/diagrams/diagrams-table.component.tsx
import { Edit as EditIcon } from '@mui/icons-material';
import { Box, Stack, Typography, Button } from '@mui/material';
import {
  DataGrid,
  DeleteCellButton,
  EnhancedColDef,
  modal,
  notifySuccess,
  Preloader,
} from '@pspod/ui-components';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { InstanceProps } from 'react-modal-promise';

import { getDiagramsQueryOptions } from '~/api/queries/diagrams/get-diagrams.query';
import { Diagram, DiagramRequest } from '~/api/utils/api-requests';
import { ApiClientSecured } from '~/api/utils/api-client';
import { DiagramForm } from '~/components/forms/diagram/diagram-form';
import { GridActionsCellItemLink } from '~/components/implicit-links';
import { showErrorMessage } from '~/utils/show-error-message';

interface DiagramsTableProps {
  projectId: string;
}

export const DiagramsTable: FC<DiagramsTableProps> = ({ projectId }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Запрос для получения диаграмм
  const {
    data: diagrams = [],
    isLoading,
    isError,
    error
  } = useQuery(getDiagramsQueryOptions(projectId));

  // Обработчик добавления диаграммы
  const handleAddDiagram = () => {
    modal({
      title: t('ACTION.ADD', {
        type: t('ENTITY.DIAGRAM').toLowerCase(),
      }),
      onOk: async (data: DiagramRequest) => {
        try {
          const diagram = await ApiClientSecured.diagramsV1Controller.createDiagram({
            ...data,
            projectId
          });

          notifySuccess(t('MESSAGE.CREATION_SUCCESS'));

          // Немедленно обновляем кэш запроса, чтобы увидеть новую диаграмму
          queryClient.setQueryData(['diagrams', projectId], (oldData: Diagram[] = []) => {
            return [...oldData, diagram];
          });

          // Перейти на страницу редактирования диаграммы
          void navigate({
            to: '/projects/project/$projectId/diagrams/$diagramId',
            params: { projectId, diagramId: diagram.id },
          });
        } catch (e) {
          showErrorMessage(e, 'ERROR.CREATION_FAILED');
        }
      },
      renderContent: (modalInstance: InstanceProps<DiagramRequest, never>) => (
        <DiagramForm {...modalInstance} />
      ),
    });
  };

  // Обработчик удаления диаграммы
  const handleDeleteDiagram = async (diagramId: string) => {
    try {
      await ApiClientSecured.diagramsV1Controller.deleteDiagram(diagramId);

      notifySuccess(t('MESSAGE.DELETION_SUCCESS'));

      // Немедленно обновляем кэш запроса, чтобы удалить диаграмму из списка
      queryClient.setQueryData(['diagrams', projectId], (oldData: Diagram[] = []) => {
        return oldData.filter(d => d.id !== diagramId);
      });
    } catch (e) {
      showErrorMessage(e, 'ERROR.DELETION_FAILED');
    }
  };

  // Колонки для таблицы
  const columns = useMemo<EnhancedColDef<Diagram>[]>(
    () => [
      {
        field: 'name',
        headerName: t('COMMON.TITLE'),
        flex: 1,
      },
      {
        field: 'description',
        headerName: t('COMMON.DESCRIPTION'),
        flex: 2,
      },
      {
        field: 'created',
        type: 'dateTime',
        headerName: t('COMMON.DATE_CREATED'),
        flex: 1,
      },
      {
        field: 'actions',
        type: 'actions',
        width: 100,
        getActions({ row }) {
          return [
            <GridActionsCellItemLink
              key={'edit'}
              label={t('ACTION.EDIT')}
              title={t('ACTION.EDIT')}
              icon={<EditIcon />}
              color={'primary'}
              to={'/projects/project/$projectId/diagrams/$diagramId'}
              params={{ projectId, diagramId: row.id }}
            />,
            <DeleteCellButton
              key={'delete'}
              deleteHandler={() => handleDeleteDiagram(row.id)}
            />,
          ];
        },
      },
    ],
    [t, projectId, handleDeleteDiagram],
  );

  return (
    <Stack height="100%" spacing={2}>
      {/* Кнопка добавления расположена слева вверху */}
      <Box display="flex" justifyContent="flex-start">
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddDiagram}
        >
          {t('ACTION.ADD', { type: t('ENTITY.DIAGRAM').toLowerCase() })}
        </Button>
      </Box>

      {/* Индикатор загрузки, сообщение об ошибке или таблица с диаграммами */}
      {isLoading ? (
        <Box flex={1} display="flex" alignItems="center" justifyContent="center">
          <Preloader />
        </Box>
      ) : isError ? (
        <Box flex={1} p={2} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
          <Typography variant="body1" color="error" gutterBottom>
            {t('ERROR.LOADING_FAILED')}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {error instanceof Error ? error.message : String(error)}
          </Typography>
        </Box>
      ) : diagrams.length === 0 ? (
        <Box flex={1} p={2} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
          <Typography variant="body1" color="textSecondary" gutterBottom>
            {t('MESSAGE.NO_DIAGRAMS')}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {t('MESSAGE.CREATE_FIRST_DIAGRAM')}
          </Typography>
        </Box>
      ) : (
        <Box flex={1}>
          <DataGrid
            items={diagrams}
            totalCount={diagrams.length}
            columns={columns}
            pinnedColumns={{ right: ['actions'] }}
          />
        </Box>
      )}
    </Stack>
  );
};

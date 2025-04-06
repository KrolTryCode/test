// src/components/tables/diagrams/diagrams-table.component.tsx
import { Edit as EditIcon, Add as AddIcon } from '@mui/icons-material';
import { Button } from '@mui/material';
import {
  DataGrid,
  DeleteCellButton,
  EnhancedColDef,
  modal,
  notifySuccess,
} from '@pspod/ui-components';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { InstanceProps } from 'react-modal-promise';

import { useDeleteDiagramMutation } from '~/api/queries/diagrams/delete-diagram.mutation';
import { getDiagramsQueryOptions } from '~/api/queries/diagrams/get-diagrams.query';
import { useCreateDiagramMutation } from '~/api/queries/diagrams/create-diagram.mutation';
import { Diagram, DiagramRequest } from '~/api/utils/api-requests';
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

  // Добавим функцию для принудительного обновления списка диаграмм
  const refreshDiagrams = () => {
    // Явно инвалидируем все запросы диаграмм
    queryClient.invalidateQueries({ queryKey: ['diagram'] });
    // Для гарантии также выполним повторный запрос
    queryClient.refetchQueries({ queryKey: ['diagram', 'byProjectId', projectId] });
  };

  // Запрос на получение диаграмм с минимальным стейлом
  const { data: diagrams = [], isLoading } = useQuery({
    ...getDiagramsQueryOptions(projectId),
    refetchOnWindowFocus: true,
    staleTime: 0, // Данные всегда устаревшие
    cacheTime: 0, // Не кэшировать результаты
    refetchInterval: 2000 // Опрашивать каждые 2 секунды
  });

  // Мутация для создания диаграммы
  const { mutateAsync: createDiagram, isPending: isCreating } = useCreateDiagramMutation({
    onSuccess: (diagram) => {
      notifySuccess(t('MESSAGE.CREATION_SUCCESS'));
      // Принудительно обновляем список диаграмм
      refreshDiagrams();
      void navigate({
        to: '/projects/project/$projectId/diagrams/$diagramId',
        params: { projectId, diagramId: diagram.id },
      });
    },
    onError: (e) => showErrorMessage(e, 'ERROR.CREATION_FAILED'),
  });

  // Мутация для удаления диаграммы
  const { mutate: deleteDiagram } = useDeleteDiagramMutation({
    onSuccess: () => {
      notifySuccess(t('MESSAGE.DELETION_SUCCESS'));
      // Принудительно обновляем список диаграмм
      refreshDiagrams();
    },
    onError: (e) => showErrorMessage(e, 'ERROR.DELETION_FAILED'),
  });

  // Обработчик добавления диаграммы
  const handleAddDiagram = () => {
    modal({
      title: t('ACTION.ADD', {
        type: t('ENTITY.DIAGRAM').toLowerCase(),
      }),
      onOk: (data: DiagramRequest) => createDiagram({ ...data, projectId }),
      renderContent: (modalInstance: InstanceProps<DiagramRequest, never>) => (
        <DiagramForm {...modalInstance} isPending={isCreating} />
      ),
    });
  };

  // Определение колонок для таблицы
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
              deleteHandler={() => deleteDiagram(row.id)}
            />,
          ];
        },
      },
    ],
    [t, projectId, deleteDiagram],
  );

  return (
    <DataGrid
      items={diagrams}
      totalCount={diagrams.length}
      columns={columns}
      loading={isLoading}
      pinnedColumns={{ right: ['actions'] }}
      customToolbarContent={
        <Button
          variant="text"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddDiagram}
        >
          {t('ENTITY.DIAGRAM')}
        </Button>
      }
    />
  );
};

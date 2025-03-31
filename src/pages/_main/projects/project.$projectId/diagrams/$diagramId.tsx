// src/pages/_main/projects/project.$projectId/diagrams/$diagramId.tsx
import { ArrowBack, Edit, DeleteOutline } from '@mui/icons-material';
import { Box, Stack, Typography, Button } from '@mui/material';
import { confirmDeletionModal, modal, notifySuccess, Preloader } from '@pspod/ui-components';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { InstanceProps } from 'react-modal-promise';

import { getDiagramQueryOptions } from '~/api/queries/diagrams/get-diagram.query';
import { DiagramRequest } from '~/api/utils/api-requests';
import { ApiClientSecured } from '~/api/utils/api-client';
import { ButtonLink } from '~/components/implicit-links';
import { DiagramForm } from '~/components/forms/diagram/diagram-form';
import { showErrorMessage } from '~/utils/show-error-message';

export const Route = createFileRoute('/_main/projects/project/$projectId/diagrams/$diagramId')({
  component: DiagramEditor,
  loader: async ({ context, params: { diagramId } }) => {
    // Заголовок страницы будет установлен позже
    context.title = t('ENTITY.DIAGRAM');
  },
});

function DiagramEditor() {
  const { projectId, diagramId } = Route.useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);

  // Получение данных диаграммы
  const { data: diagram, isLoading, isError, error } = useQuery(getDiagramQueryOptions(diagramId));

  // Обновляем заголовок страницы при загрузке диаграммы
  useEffect(() => {
    if (diagram?.name) {
      document.title = `${diagram.name} - ${t('ENTITY.DIAGRAM')}`;
    }
  }, [diagram, t]);

  // Обработчик редактирования диаграммы
  const handleEditDiagram = () => {
    if (!diagram) return;

    modal({
      title: t('ACTION.EDIT', {
        type: t('ENTITY.DIAGRAM').toLowerCase(),
      }),
      onOk: async (data: DiagramRequest) => {
        try {
          setIsEditing(true);
          const updatedDiagram = await ApiClientSecured.diagramsV1Controller.updateDiagram(
            diagramId,
            data
          );

          notifySuccess(t('MESSAGE.UPDATE_SUCCESS'));

          // Обновляем кэш запроса для текущей диаграммы
          queryClient.setQueryData(['diagram', diagramId], updatedDiagram);

          // Обновляем кэш списка диаграмм
          queryClient.setQueryData(['diagrams', projectId], (oldData = []) => {
            return oldData.map(d => d.id === diagramId ? updatedDiagram : d);
          });
        } catch (e) {
          showErrorMessage(e, 'ERROR.UPDATE_FAILED');
        } finally {
          setIsEditing(false);
        }
      },
      renderContent: (modalInstance: InstanceProps<DiagramRequest, never>) => (
        <DiagramForm
          data={{ name: diagram.name, description: diagram.description }}
          {...modalInstance}
        />
      ),
    });
  };

  // Обработчик удаления диаграммы
  const handleDeleteDiagram = () => {
    confirmDeletionModal({
      title: t('MESSAGE.CONFIRM_DELETE_ENTITY', {
        what: t('ENTITY.DIAGRAM').toLowerCase()
      }),
      onOk: async () => {
        try {
          await ApiClientSecured.diagramsV1Controller.deleteDiagram(diagramId);

          notifySuccess(t('MESSAGE.DELETION_SUCCESS'));

          // Обновляем кэш списка диаграмм
          queryClient.setQueryData(['diagrams', projectId], (oldData = []) => {
            return oldData.filter(d => d.id !== diagramId);
          });

          // Вернуться к списку диаграмм
          void navigate({
            to: '/projects/project/$projectId/diagrams',
            params: { projectId },
          });
        } catch (e) {
          showErrorMessage(e, 'ERROR.DELETION_FAILED');
        }
      },
    });
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <Preloader />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box p={2}>
        <ButtonLink
          variant="text"
          to="/projects/project/$projectId/diagrams"
          params={{ projectId }}
          icon={<ArrowBack />}
        />
        <Typography variant="h6" color="error" gutterBottom>
          {t('ERROR.LOADING_FAILED')}
        </Typography>
        <Typography color="textSecondary">
          {error instanceof Error ? error.message : String(error)}
        </Typography>
      </Box>
    );
  }

  if (!diagram) {
    return (
      <Box p={2}>
        <ButtonLink
          variant="text"
          to="/projects/project/$projectId/diagrams"
          params={{ projectId }}
          icon={<ArrowBack />}
        />
        <Typography variant="h6" color="error">
          {t('ERROR.DIAGRAM_NOT_FOUND')}
        </Typography>
      </Box>
    );
  }

  return (
    <Stack spacing={2} height="100%">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" alignItems="center" spacing={1}>
          <ButtonLink
            variant="text"
            to="/projects/project/$projectId/diagrams"
            params={{ projectId }}
            icon={<ArrowBack />}
          />
          <Typography variant="h3" component="h2">
            {diagram.name}
          </Typography>
          <Button
            size="small"
            variant="text"
            color="primary"
            onClick={handleEditDiagram}
            startIcon={<Edit />}
            disabled={isEditing}
          >
            {t('ACTION.EDIT')}
          </Button>
        </Stack>
        <Button
          color="error"
          variant="outlined"
          startIcon={<DeleteOutline />}
          onClick={handleDeleteDiagram}
          disabled={isEditing}
        >
          {t('ACTION.DELETE')}
        </Button>
      </Stack>

      {diagram.description && (
        <Typography variant="body1" color="textSecondary">
          {diagram.description}
        </Typography>
      )}

      <Box
        flex={1}
        border="1px solid"
        borderColor="divider"
        borderRadius={1}
        p={2}
        bgcolor="background.paper"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography align="center" color="textSecondary">
          {t('MESSAGE.DIAGRAM_EDITOR_PLACEHOLDER')}
        </Typography>
      </Box>
    </Stack>
  );
}

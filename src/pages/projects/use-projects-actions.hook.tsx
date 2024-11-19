import {
  Preview as PreviewIcon,
  PeopleAltOutlined as PeopleAltOutlinedIcon,
} from '@mui/icons-material';
import { MenuItem } from '@mui/material';
import { GridActionsCellItem, GridAddIcon, GridRowParams } from '@mui/x-data-grid-premium';
import {
  Button,
  ImportProject,
  notifySuccess,
  DropdownGridToolbarContainer,
} from '@pspod/ui-components';
import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { Case, Gender } from 'russian-nouns-js';

import { useCreateProjectNodeMutation } from '~/api/queries/projects/create-project-node.mutation';
import { ProjectNode, ProjectNodeType } from '~/api/utils/api-requests';
import { projectNodeModal } from '~/pages/projects/project-node/form/project-node-form.component';
import { participantsPath, projectPath, projectsPath } from '~/utils/configuration/routes-paths';
import { useDeclinatedText } from '~/utils/hooks/use-declinated-text';
import { useNounDeclination } from '~/utils/hooks/use-noun-declination';
import { showErrorMessage } from '~/utils/show-error-message';

export const useProjectsActions = () => {
  const { t } = useTranslation();
  const { projectGroupId } = useParams();
  const { declinatedGroupText } = useDeclinatedText();

  const { mutate: createProjectNode } = useCreateProjectNodeMutation({
    onSuccess: () => notifySuccess(t('MESSAGE.CREATION_SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.CREATION_FAILED'),
  });

  const groupGenitive = useNounDeclination({
    text: 'ENTITY.GROUP',
    gender: Gender.FEMININE,
    morphologicalCase: Case.GENITIVE,
  });

  const handleAddProjectNode = useCallback(() => {
    projectNodeModal({
      onSave: createProjectNode,
      title: t('ACTION.CREATE', { type: t('ENTITY.PROJECT').toLowerCase() }),
      data: { type: ProjectNodeType.Project, parentId: projectGroupId },
    });
  }, [createProjectNode, projectGroupId, t]);

  const handleAddProjectGroup = useCallback(() => {
    projectNodeModal({
      onSave: createProjectNode,
      title: t('ACTION.CREATE', { type: declinatedGroupText.toLowerCase() }),
      data: { type: ProjectNodeType.Group, parentId: projectGroupId },
    });
  }, [declinatedGroupText, createProjectNode, projectGroupId, t]);

  const handleImportProject = useCallback(() => {
    console.log('TODO import project');
  }, []);

  const handleExportProjectNode = useCallback((id: string) => {
    console.log(id, 'TODO export project');
  }, []);

  const handleMoveProjectNode = useCallback((id: string) => {
    console.log(id, 'TODO move project');
  }, []);

  const getActions = useCallback(
    ({ row: { id, type } }: GridRowParams<ProjectNode>) => {
      const path = `/${projectsPath}/${
        type === ProjectNodeType.Group ? '' : `${projectPath}/`
      }${id}`;
      return [
        <GridActionsCellItem
          key={'view'}
          label={t('BUTTON.VIEW')}
          color={'primary'}
          component={Link}
          // @ts-expect-error type
          to={path}
          icon={<PreviewIcon />}
        />,
        <GridActionsCellItem
          showInMenu
          key={'move'}
          label={t('ACTION.MOVE')}
          onClick={() => handleMoveProjectNode(id)}
        />,
        <GridActionsCellItem
          showInMenu
          key={'export'}
          label={t('ACTION.EXPORT')}
          onClick={() => handleExportProjectNode(id)}
        />,
      ];
    },
    [handleExportProjectNode, handleMoveProjectNode, t],
  );

  const ProjectsListToolbarContent: FC = () => {
    const { declinatedGroupText } = useDeclinatedText();
    return (
      <>
        <DropdownGridToolbarContainer text={'ACTION.CREATE'} icon={<GridAddIcon />}>
          <MenuItem key={1} onClick={handleAddProjectGroup}>
            {declinatedGroupText}
          </MenuItem>
          <MenuItem key={2} onClick={handleAddProjectNode}>
            {t('ENTITY.PROJECT')}
          </MenuItem>
        </DropdownGridToolbarContainer>
        <ImportProject onClick={handleImportProject} />
        <Button
          variant={'text'}
          color={'primary'}
          icon={<PeopleAltOutlinedIcon />}
          component={Link}
          to={participantsPath}
          hidden={!projectGroupId}
        >
          {t('NAVIGATION.PARTICIPANTS')} {groupGenitive.toLowerCase()}
        </Button>
      </>
    );
  };

  return { getActions, handleAddProjectGroup, ProjectsListToolbarContent };
};

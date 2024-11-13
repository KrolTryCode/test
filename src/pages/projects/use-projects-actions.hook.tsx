import { Preview as PreviewIcon } from '@mui/icons-material';
import { MenuItem } from '@mui/material';
import { GridActionsCellItem, GridAddIcon, GridRowParams } from '@mui/x-data-grid-premium';
import {
  DeleteCellButton,
  ImportProject,
  DropdownGridToolbarContainer,
} from '@pspod/ui-components';
import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { Case, Gender } from 'russian-nouns-js';

import { ProjectNode, ProjectNodeType } from '~/api/utils/api-requests';
import { NavTreeItemData, NavTreeItemType } from '~/components/nav-tree/nav-tree.type';
import { projectNodeModal } from '~/pages/projects/project-node/form/project-node-form.component';
import { useProjectsActionsMutations } from '~/pages/projects/use-projects-actions-mutations.hook';
import { useTreeNodesUtils } from '~/pages/tables/tree/use-tree-nodes-utils.hook';
import { projectPath, projectsPath } from '~/utils/configuration/routes-paths';
import { useNounDeclination } from '~/utils/hooks/use-noun-declination';

const isProjectSubtreeTypeEnum = (
  projectNodeType?: NavTreeItemType,
): projectNodeType is ProjectNodeType => {
  return !!projectNodeType && Object.values<string>(ProjectNodeType).includes(projectNodeType);
};

export const useProjectsActions = (treeData: NavTreeItemData[]) => {
  const { t } = useTranslation();
  const { projectGroupId } = useParams();
  const { findNode } = useTreeNodesUtils(treeData);
  const { createProjectNode, deleteProjectNode, updateProjectNode } = useProjectsActionsMutations();

  const addGroupText = useNounDeclination({
    text: 'ENTITY.GROUP',
    gender: Gender.FEMININE,
    morphologicalCase: Case.ACCUSATIVE,
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
      title: t('ACTION.CREATE', { type: addGroupText.toLowerCase() }),
      data: { type: ProjectNodeType.Group, parentId: projectGroupId },
    });
  }, [addGroupText, createProjectNode, projectGroupId, t]);

  const handleEditProjectNode = useCallback(
    (id: string) => {
      const projectNode = findNode(id);
      if (!projectNode) {
        return;
      }
      if (isProjectSubtreeTypeEnum(projectNode.type)) {
        projectNodeModal({
          isEditing: true,
          title: t('ACTION.EDIT'),
          data: {
            name: projectNode.label,
            description: projectNode.description,
            type: projectNode.type,
          },
          onSave: data =>
            updateProjectNode({ nodeId: id, name: data.name, description: data.description }),
        });
      }
    },
    [findNode, t, updateProjectNode],
  );

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
          key={'edit'}
          label={t('ACTION.EDIT')}
          onClick={() => handleEditProjectNode(id)}
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
        <DeleteCellButton key={'delete'} showInMenu deleteHandler={() => deleteProjectNode(id)} />,
      ];
    },
    [deleteProjectNode, handleEditProjectNode, handleExportProjectNode, handleMoveProjectNode, t],
  );

  const ProjectsListToolbarContent: FC = () => {
    return (
      <>
        <DropdownGridToolbarContainer text={'ACTION.CREATE'} icon={<GridAddIcon />}>
          <MenuItem key={1} onClick={handleAddProjectGroup}>
            {addGroupText}
          </MenuItem>
          <MenuItem key={2} onClick={handleAddProjectNode}>
            {t('ENTITY.PROJECT')}
          </MenuItem>
        </DropdownGridToolbarContainer>
        <ImportProject onClick={handleImportProject} />
      </>
    );
  };

  return { getActions, handleAddProjectGroup, ProjectsListToolbarContent };
};

import { Preview as PreviewIcon } from '@mui/icons-material';
import { GridActionsCellItem, GridRowParams } from '@mui/x-data-grid-premium';
import { AddEntity, ImportProject, DeleteCellButton } from '@pspod/ui-components';
import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';

import {
  CreateProjectNodeRequestTypeEnum,
  ProjectNode,
  ProjectNodeTypeEnum,
  ProjectSubtreeTypeEnum,
} from '~/api/utils/api-requests';
import { NavTreeItemData, NavTreeItemType } from '~/components/nav-tree/nav-tree.type';
import { projectNodeModal } from '~/pages/projects/project-node/form/project-node-form.component';
import { useProjectsActionsMutations } from '~/pages/projects/use-projects-actions-mutations.hook';
import { useTreeNodesUtils } from '~/pages/tables/tree/use-tree-nodes-utils.hook';
import { projectPath, projectsPath } from '~/utils/configuration/routes-paths';

const isProjectSubtreeTypeEnum = (
  projectNodeType?: NavTreeItemType,
): projectNodeType is ProjectSubtreeTypeEnum => {
  return (
    !!projectNodeType && Object.values<string>(ProjectSubtreeTypeEnum).includes(projectNodeType)
  );
};

export const useProjectsActions = (treeData: NavTreeItemData[]) => {
  const { t } = useTranslation();
  const { projectGroupId } = useParams();
  const { findNode } = useTreeNodesUtils(treeData);
  const { createProjectNode, deleteProjectNode, updateProjectNode } = useProjectsActionsMutations();

  const handleAddProjectNode = useCallback(() => {
    projectNodeModal({
      onSave: createProjectNode,
      title: t('ACTION.ADD_PROJECT'),
      data: { type: CreateProjectNodeRequestTypeEnum.Project, parentId: projectGroupId },
    });
  }, [createProjectNode, projectGroupId, t]);

  const handleAddProjectGroup = useCallback(() => {
    projectNodeModal({
      onSave: createProjectNode,
      title: t('ACTION.CREATE_GROUP'),
      data: { type: CreateProjectNodeRequestTypeEnum.Group, parentId: projectGroupId },
    });
  }, [createProjectNode, projectGroupId, t]);

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
            // TODO Задача BE-35 https://tracker.yandex.ru/BE-35
            type: projectNode.type as unknown as CreateProjectNodeRequestTypeEnum,
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
        type === ProjectNodeTypeEnum.Group ? '' : `${projectPath}/`
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
        <AddEntity customText={`ACTION.ADD_PROJECT`} onClick={handleAddProjectNode} />
        <AddEntity customText={'ACTION.CREATE_GROUP'} onClick={handleAddProjectGroup} />
        <ImportProject onClick={handleImportProject} />
      </>
    );
  };

  return { getActions, handleAddProjectNode, ProjectsListToolbarContent };
};

import { Edit, DeleteOutline, Download } from '@mui/icons-material';
import { Button } from '@pspod/ui-components';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { NodeHeader } from '~/components/node-header/node-header.component';
import { useNodeActions } from '~/components/node-header/node-header.hook';
import { useExportProject } from '~/use-cases/export-project.hook';

interface ProjectHeaderProps {
  projectId: string;
}

export const ProjectHeader: FC<ProjectHeaderProps> = ({ projectId }) => {
  const { t } = useTranslation();

  const {
    nodeData: projectData,
    isNodeDataLoading: isProjectDataLoading,
    updateProjectOrGroup,
    deleteProjectOrGroup,
  } = useNodeActions(projectId);

  const { exportProject } = useExportProject(projectData);

  const getActions = () => [
    <Button
      key={'edit'}
      size={'small'}
      color={'primary'}
      title={t('ACTION.EDIT')}
      onClick={() => updateProjectOrGroup(projectData)}
      variant={'text'}
      icon={<Edit />}
    />,
    <Button
      key={'export'}
      size={'small'}
      color={'primary'}
      title={t('ACTION.EXPORT', { what: t('ENTITY.PROJECT').toLowerCase() })}
      onClick={exportProject}
      variant={'text'}
      icon={<Download />}
    />,
    <Button
      key={'delete'}
      size={'small'}
      color={'error'}
      title={t('ACTION.DELETE')}
      variant={'text'}
      icon={<DeleteOutline />}
      onClick={() => deleteProjectOrGroup(projectData)}
    />,
  ];

  return (
    <NodeHeader
      {...projectData}
      isLoading={isProjectDataLoading}
      id={projectId}
      actions={getActions()}
    >
      {projectData?.name ?? t('TREE.NODE')}
    </NodeHeader>
  );
};

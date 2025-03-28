import { Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { getContentNodesByParentQueryOptions } from '~/api/queries/project-content/get-content-nodes-by-parent.query';

import { ProjectContentTreeItem } from './project-content-tree-item.component';

export const ProjectContentTree: FC = () => {
  const { projectId, tableId, folderId } = useParams({
    strict: false,
  });

  const { t } = useTranslation();

  /*
    TODO: expand to current node (https://tracker.yandex.ru/BE-220)
    example src/components/trees/app-group-select-tree
  */
  const _contentNodeId = tableId ?? folderId;

  const { data: rootNodes = [] } = useQuery(getContentNodesByParentQueryOptions(projectId!));

  return rootNodes.length ? (
    rootNodes.map(node => (
      <ProjectContentTreeItem key={node.id} contentTreeNode={node} projectId={projectId!} />
    ))
  ) : (
    <Typography variant={'subtitle2'} textAlign={'center'} color={'secondary'}>
      {t('TREE.EMPTY_PROJECT')}
    </Typography>
  );
};

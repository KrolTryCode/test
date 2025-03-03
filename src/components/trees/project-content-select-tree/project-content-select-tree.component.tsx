import { Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { createContext, FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { getContentNodesByParentQueryOptions } from '~/api/queries/project-content/get-content-nodes-by-parent.query';
import { ContentNode, ContentNodeType } from '~/api/utils/api-requests';

import { ProjectContentSelectTreeItem } from './project-content-select-tree-item.component';
import { _ProjectContentSelectTreeContainer } from './project-content-select-tree-item.styled';

// #region types

type ProjectContentSelectTreeCommonProps = {
  showRoot?: boolean;
  canSelectItem?: (contentNode: ContentNode) => boolean;
  projectId: string;
  pathToSelected: string[];
};

type ProjectContentSingleSelectTreeProps = {
  isMultiple: false;
  value?: string;
  onChange?: (value: string) => void;
};

type ProjectContentMultiSelectTreeProps = {
  isMultiple: true;
  value?: string[];
  onChange?: (value: string[]) => void;
};

export type ProjectContentSelectTreeProps = ProjectContentSelectTreeCommonProps &
  (ProjectContentSingleSelectTreeProps | ProjectContentMultiSelectTreeProps);

// #endregion

// #region context

export const ProjectContentSelectTreeContext = createContext<ProjectContentSelectTreeProps>(
  undefined!,
);

export const useProjectContentSelectTreeContext = () => useContext(ProjectContentSelectTreeContext);

// #endregion

export const ProjectContentSelectTree: FC<ProjectContentSelectTreeProps> = props => {
  const { t } = useTranslation();

  const { data: rootNodes = [] } = useQuery(getContentNodesByParentQueryOptions(props.projectId));

  return rootNodes.length ? (
    <ProjectContentSelectTreeContext.Provider value={props}>
      <_ProjectContentSelectTreeContainer>
        {props.showRoot && (
          <ProjectContentSelectTreeItem
            contentTreeNode={{
              id: '',
              name: t('COMMON.NO_PARENT'),
              type: ContentNodeType.Directory,
              hasChildren: false,
            }}
          />
        )}
        {rootNodes.map(node => (
          <ProjectContentSelectTreeItem key={node.id} contentTreeNode={node} />
        ))}
      </_ProjectContentSelectTreeContainer>
    </ProjectContentSelectTreeContext.Provider>
  ) : (
    <Typography variant={'body1'} textAlign={'center'} color={'secondary'}>
      {t('ERROR.NOT_FOUND_NODES.TEXT1')}
    </Typography>
  );
};

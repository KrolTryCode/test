import { Preloader, EnhancedColDef } from '@pspod/ui-components';
import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { ProjectNode } from '~/api/utils/api-requests';
import { DataGrid } from '~/components/datagrid/datagrid.component';
import { NotFoundNodes } from '~/pages/_fallbacks/errors/not-found/not-found.component';
import { ProjectHeader } from '~/pages/projects/project-header/project-header.component';
import { useProjectsActions } from '~/pages/projects/use-projects-actions.hook';
import { useProjectsData } from '~/pages/projects/use-projects-data.hook';

const ProjectsList: FC = () => {
  const { t } = useTranslation();
  const { projectGroupId } = useParams();

  const { treeData, isLoading, projectNodesByParent } = useProjectsData();
  const { getActions, handleAddProjectNode, ProjectsListToolbarContent } =
    useProjectsActions(treeData);

  const columns = useMemo<EnhancedColDef<ProjectNode>[]>(
    () => [
      {
        field: 'name',
        headerName: t('COMMON.TITLE'),
        flex: 1,
      },
      {
        field: 'description',
        headerName: t('COMMON.DESCRIPTION'),
        flex: 3,
      },
      {
        field: 'type',
        headerName: t('COMMON.TYPE'),
        flex: 2,
      },
      {
        field: 'created',
        headerName: t('JOURNAL.DATE'),
        type: 'dateTime',
        flex: 1,
      },
      {
        field: 'actions',
        width: 90,
        type: 'actions',
        getActions,
      },
    ],
    [getActions, t],
  );

  if (isLoading) {
    return <Preloader />;
  }

  if (!projectNodesByParent.length && !isLoading) {
    return <NotFoundNodes action={handleAddProjectNode} />;
  }

  return (
    <>
      {projectGroupId && <ProjectHeader />}
      <DataGrid<ProjectNode>
        items={projectNodesByParent}
        columns={columns}
        totalCount={projectNodesByParent.length}
        hasColumnChooser={false}
        pinnedColumns={{ right: ['actions'] }}
        customToolbarContent={<ProjectsListToolbarContent />}
      />
    </>
  );
};

export default ProjectsList;

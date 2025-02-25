import { Typography, Stack, styled } from '@mui/material';
import { Preloader } from '@pspod/ui-components';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { getContentNodesByParentOptions } from '~/api/queries/project-content/get-content-nodes-by-parent.query';
import { getProjectContentQueryOptions } from '~/api/queries/project-content/get-project-content.query';
import { isFolderType, renderItemIcon } from '~/components/tree/nav-tree/nav-tree.utils';

export const Route = createFileRoute(
  '/_main/projects/project/$projectId/tables/folders/$folderId/',
)({
  component: FoldersPage,
  loader: async ({ context, params: { folderId } }) => {
    const folderData = await context.queryClient.fetchQuery(
      getProjectContentQueryOptions(folderId),
    );
    context.title = folderData.name;
  },
});

const NodeLink = styled(Link)(({ theme }) => ({
  ...theme.typography.h6,
  color: theme.palette.primary.main,
  textDecoration: 'none',
  hyphens: 'auto',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

function FoldersPage() {
  const { t } = useTranslation();
  const { projectId, folderId } = Route.useParams();
  const { data: nodes, isLoading } = useQuery(getContentNodesByParentOptions(projectId, folderId));

  if (nodes?.length === 0) {
    return (
      <Typography variant={'subtitle2'} color={'secondary'} textAlign={'center'}>
        {t('ERROR.EMPTY_DIRECTORY.TEXT1')}
      </Typography>
    );
  }

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <Stack>
      {nodes?.map(current => {
        return (
          <Stack direction={'row'} alignItems={'center'} key={current.id}>
            {renderItemIcon(current.type)}
            <NodeLink
              to={
                isFolderType(current.type)
                  ? `/projects/project/${projectId}/tables/folders/${current.id}`
                  : `/projects/project/${projectId}/tables/${current.id}/structure`
              }
            >
              {current.name}
            </NodeLink>
          </Stack>
        );
      })}
    </Stack>
  );
}

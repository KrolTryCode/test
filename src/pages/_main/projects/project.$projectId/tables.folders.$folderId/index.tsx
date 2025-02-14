import { Box, Stack, styled } from '@mui/material';
import { Preloader } from '@pspod/ui-components';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';

import { getContentNodesByParentOptions } from '~/api/queries/project-content/get-content-nodes-by-parent.query';
import { isFolderType, renderItemIcon } from '~/components/tree/nav-tree/nav-tree.utils';
import { EmptyDirectory } from '~/routing/_fallbacks/info/empty-element.component';

export const Route = createFileRoute(
  '/_main/projects/project/$projectId/tables/folders/$folderId/',
)({
  component: FoldersPage,
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
  const { projectId, folderId } = Route.useParams();
  const { data: nodes, isLoading } = useQuery(getContentNodesByParentOptions(projectId, folderId));

  if (nodes?.length === 0) {
    return <EmptyDirectory />;
  }

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <Stack>
      {nodes?.map(current => {
        return (
          <Box display={'flex'} key={current.id}>
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
          </Box>
        );
      })}
    </Stack>
  );
}

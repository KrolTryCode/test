import { Box, Stack, styled } from '@mui/material';
import { Preloader } from '@pspod/ui-components';
import { createFileRoute, Link } from '@tanstack/react-router';

import { useGetContentNodesByParent } from '~/api/queries/project-content/get-content-nodes-by-parent.query';
import { isFolderType, renderItemIcon } from '~/components/nav-tree/nav-tree.utils';
import { EmptyDirectory } from '~/pages/_fallbacks/info/empty/empty-element.component';

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
  const { data: nodes, isLoading } = useGetContentNodesByParent(projectId, folderId);

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

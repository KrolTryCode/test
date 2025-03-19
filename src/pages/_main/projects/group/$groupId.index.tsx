import { createFileRoute } from '@tanstack/react-router';

import { projectNodeQueryOptions } from '~/api/queries/projects/get-project-node.query';
import { GroupHeader } from '~/components/node-header/group-header.component';
import { ProjectList } from '~/components/trees/app-projects-tree/app-projects-tree.component';

export const Route = createFileRoute('/_main/projects/group/$groupId/')({
  component: GroupPage,
  loader: async ({ context, params: { groupId } }) => {
    const nodeData = await context.queryClient.fetchQuery(projectNodeQueryOptions(groupId));
    context.title = nodeData.name;
  },
});

function GroupPage() {
  const { groupId } = Route.useParams();

  return (
    <>
      <GroupHeader groupId={groupId} />
      <ProjectList />
    </>
  );
}

import { createFileRoute } from '@tanstack/react-router';

import { projectNodeQueryOptions } from '~/api/queries/projects/get-project-node.query';
import { GroupHeader } from '~/components/node-header/group-header.component';
import { ProjectList } from '~/components/project-list/project-list.component';

export const Route = createFileRoute('/_main/projects/group/$groupId/')({
  component: GroupPage,
  loader: ({ context: { queryClient }, params: { groupId } }) =>
    queryClient.ensureQueryData(projectNodeQueryOptions(groupId)),
});

function GroupPage() {
  const { groupId } = Route.useParams();
  // const groupData = Route.useLoaderData();

  return (
    <>
      <GroupHeader groupId={groupId} />
      <ProjectList />
    </>
  );
}

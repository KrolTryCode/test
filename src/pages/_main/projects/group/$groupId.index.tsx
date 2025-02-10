import { createFileRoute } from '@tanstack/react-router';

import { GroupHeader } from '~/components/node-header/group-header.component';
import { ProjectList } from '~/components/project-list/project-list.component';

export const Route = createFileRoute('/_main/projects/group/$groupId/')({
  component: GroupPage,
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

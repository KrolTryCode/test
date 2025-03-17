import { createFileRoute } from '@tanstack/react-router';

import { GroupHeader } from '~/components/node-header/group-header.component';
import { EventsTable } from '~/components/tables/audits/events/events.component';

export const Route = createFileRoute('/_main/projects/group/$groupId/events')({
  component: GroupEvents,
});

function GroupEvents() {
  const { groupId } = Route.useParams();

  return (
    <>
      <GroupHeader groupId={groupId} />
      <EventsTable parentNodeId={groupId} />
    </>
  );
}

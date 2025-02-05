import { createFileRoute } from '@tanstack/react-router';

import { GroupHeader } from '~/components/node-header/group-header.component';

import { ParticipantsTable } from '../_components/paritcipants-table.component';

export const Route = createFileRoute('/_main/projects/group/$groupId/participants')({
  component: GroupParticipants,
});

function GroupParticipants() {
  const { groupId } = Route.useParams();

  return (
    <>
      <GroupHeader groupId={groupId} />
      <ParticipantsTable id={groupId} />
    </>
  );
}

import { createFileRoute } from '@tanstack/react-router';

import { ParticipantsTable } from '../_components/participants/paritcipants-table.component';

import { GroupHeader } from './_components/group-header/group-header.component';

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

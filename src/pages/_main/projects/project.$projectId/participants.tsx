import { createFileRoute } from '@tanstack/react-router';

import { ParticipantsTable } from '../_components/participants/paritcipants-table.component';

export const Route = createFileRoute('/_main/projects/project/$projectId/participants')({
  component: ProjectParticipants,
  staticData: {
    title: 'NAVIGATION.PARTICIPANTS',
    order: 7,
  },
});

function ProjectParticipants() {
  const { projectId } = Route.useParams();
  return <ParticipantsTable id={projectId} />;
}

import { createFileRoute } from '@tanstack/react-router';

import { EventsTable } from '~/components/tables/audits/events/events.component';

export const Route = createFileRoute('/_main/projects/project/$projectId/events')({
  component: ProjectEvents,
  staticData: {
    title: 'NAVIGATION.EVENTS',
    order: 8,
  },
});

function ProjectEvents() {
  const { projectId } = Route.useParams();
  return <EventsTable parentNodeId={projectId} />;
}

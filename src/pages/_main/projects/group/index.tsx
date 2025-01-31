import { Stack } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router';

import { CreateNodeMenu } from '~/components/create-menu/create-node-menu.component';

import { ProjectList } from './_components/project-list/project-list.component';

export const Route = createFileRoute('/_main/projects/group/')({
  component: GroupLayout,
});

function GroupLayout() {
  return (
    <>
      <Stack padding={1} gap={2} direction={'row'} justifyContent={'flex-start'}>
        <CreateNodeMenu />
      </Stack>
      <ProjectList />
    </>
  );
}

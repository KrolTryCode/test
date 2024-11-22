import { Divider, Stack } from '@mui/material';
import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { ProjectTabs } from '~/pages/projects/project/project-tabs/project-tabs.component';
import { ProjectHeader } from '~/pages/projects/project-header/project-header.component';

const ProjectPage: FC = () => {
  const { projectId } = useParams();

  return (
    <Stack flexDirection={'column'} height={'100%'}>
      <ProjectHeader projectId={projectId!} />
      <Divider />
      <ProjectTabs />
    </Stack>
  );
};

export default ProjectPage;

import { Stack, Typography } from '@mui/material';
import { Preloader } from '@pspod/ui-components';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { useGetProjectContentQuery } from '~/api/queries/project-content/get-project-content.query';
import { ButtonLink } from '~/components/implicit-links';
import { ProjectTableStructure } from '~/components/tables/project-table-structure/project-table-structure.component';

export const Route = createFileRoute(
  '/_main/projects/project/$projectId/tables/$tableId/structure',
)({
  component: TableStructure,
  staticData: {
    title: 'STRUCTURE.EDIT',
  },
});

function TableStructure() {
  const { t } = useTranslation();
  const { tableId } = Route.useParams();

  const { data: nodeInfo, isLoading: isNodeLoading } = useGetProjectContentQuery(tableId);

  if (isNodeLoading) {
    return <Preloader />;
  }

  return (
    <Stack height={'100%'} gap={1}>
      <Typography variant={'h3'} color={'primary'}>
        {`${t('STRUCTURE.LIST')} ${nodeInfo?.name ?? ''}`}
      </Typography>

      <ProjectTableStructure tableId={tableId} />

      <Stack direction={'row'} gap={1} alignSelf={'flex-end'}>
        <ButtonLink color={'primary'} to={'..'}>
          {t('ACTION.BACK')}
        </ButtonLink>
      </Stack>
    </Stack>
  );
}

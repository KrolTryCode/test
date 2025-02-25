import { ArrowBack, Edit as EditIcon, DeleteOutline as DeleteIcon } from '@mui/icons-material';
import { Card, CardContent, Divider, Stack, Typography } from '@mui/material';
import { Button, FileCard } from '@pspod/ui-components';
import { createFileRoute } from '@tanstack/react-router';
import { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';

import { getSolversQueryOptions } from '~/api/queries/solvers/get-solvers.query';
import { Solver } from '~/api/utils/api-requests';
import { ButtonLink } from '~/components/implicit-links';
import { SummaryTable, SummaryEntry } from '~/components/summary-table/summary-table.component';
import { useSolverActions } from '~/components/tables/solvers/solvers-table.hook';
import { useGetSolverFile } from '~/use-cases/get-solver-file.hook';
import { useDeclinatedTranslationsContext } from '~/utils/configuration/translations/declinated-translations-provider';
import { calcFileSize, getFileIcon } from '~/utils/files';

export const Route = createFileRoute('/_main/projects/project/$projectId/solvers/$solverId')({
  component: SolverPage,
  loader: async ({ context, params: { projectId, solverId } }) => {
    const solvers = await context.queryClient.fetchQuery(getSolversQueryOptions(projectId));
    const solver = solvers.find(s => s.id === solverId);
    context.title = solver?.name;
    return { solver };
  },
});

function SolverPage() {
  const { t } = useTranslation();
  const { SOLVERS } = useDeclinatedTranslationsContext();

  const { projectId, solverId } = Route.useParams();
  const navigate = Route.useNavigate();

  const { solver } = Route.useLoaderData();

  const { file, isFetching, onDownloadFile } = useGetSolverFile(solverId);

  const { handleUpdateSolver, handleDeleteSolver } = useSolverActions(projectId);

  if (!solver) {
    return null;
  }

  return (
    <Stack
      paddingTop={4}
      height={'100%'}
      width={'fit-content'}
      maxWidth={'900px'}
      marginInline={'auto'}
      gap={1}
    >
      <Card>
        <CardContent>
          <Stack direction={'row'} width={'100%'}>
            <ButtonLink
              to={'..'}
              variant={'text'}
              icon={<ArrowBack />}
              sx={{ marginRight: 'auto' }}
            >
              {`${t('PREPOSITION.K')} ${SOLVERS.DATIVE.toLowerCase()}`}
            </ButtonLink>
            <Button
              variant={'text'}
              size={'small'}
              icon={<EditIcon />}
              onClick={() => handleUpdateSolver(solver)}
            />
            <Button
              variant={'text'}
              size={'small'}
              color={'error'}
              icon={<DeleteIcon />}
              onClick={() => handleDeleteSolver(solverId, () => void navigate({ to: '..' }))}
            />
          </Stack>

          <Divider sx={theme => ({ marginBlock: theme.spacing(1) })} />

          <SummaryTable data={getSolverInfo(solver, t)} alignTitle={'left'} />

          <Stack hidden={!file} paddingInline={1}>
            <Typography variant={'subtitle2'}>{t('COMMON.FILE')}</Typography>
            {!!file && (
              <FileCard
                variant={'outlined'}
                isLoading={isFetching}
                name={file.fileName!}
                id={file.fileId!}
                description={`${t('COMMON.SIZE')}: ${calcFileSize(file.file.size)}`}
                onDownload={onDownloadFile}
                CustomIcon={getFileIcon('zip')}
              />
            )}
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}

function getSolverInfo(solver: Solver, t: TFunction): SummaryEntry[] {
  return [
    { title: t('COMMON.TITLE'), value: solver.name },
    { title: t('STATUS.ACTIVE'), value: solver.active, type: 'boolean' },
    { title: t('COMMON.DESCRIPTION'), value: solver.description },
    { title: t('COMMON.DATE_CREATED'), value: solver.created, type: 'dateTime' },
    { title: t('COMMON.AUTHOR'), value: solver.authorName },
  ];
}

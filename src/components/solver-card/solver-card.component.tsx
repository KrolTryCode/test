import { Box, Card, CardContent, ClickAwayListener, Stack, Typography } from '@mui/material';
import { Button, PopperWithPaper } from '@pspod/ui-components';
import { useQuery } from '@tanstack/react-query';
import { TFunction } from 'i18next';
import { FC, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getSolversQueryOptions } from '~/api/queries/solvers/get-solvers.query';
import { Solver } from '~/api/utils/api-requests';
import { SolverFileCard } from '~/components/solver-file-card/solver-file-card.component';
import { SummaryTable, SummaryEntry } from '~/components/summary-table/summary-table.component';

interface SolverCardProps {
  projectId: string;
  solverId: string;
}

export const SolverCardPopper: FC<
  SolverCardProps & {
    solverName: string;
  }
> = ({ projectId, solverId, solverName }) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [showCard, setShowCard] = useState(false);

  return (
    <ClickAwayListener onClickAway={() => setShowCard(false)}>
      <Box>
        <Button
          variant={'text'}
          size={'large'}
          color={'primary'}
          onClick={() => setShowCard(prev => !prev)}
          sx={{ padding: 0 }}
        >
          <span ref={ref}>{solverName}</span>
        </Button>
        <PopperWithPaper isOpen={showCard} anchorEl={ref.current ?? undefined} placement={'right'}>
          <SolverCard projectId={projectId} solverId={solverId} />
        </PopperWithPaper>
      </Box>
    </ClickAwayListener>
  );
};

const SolverCard: FC<SolverCardProps> = ({ projectId, solverId }) => {
  const { t } = useTranslation();

  const { data: solver } = useQuery(
    getSolversQueryOptions(projectId, { select: solvers => solvers.find(s => s.id === solverId) }),
  );

  if (!solver) {
    return t('ERROR.NOT_FOUND_NODES');
  }

  return (
    <Card sx={{ minWidth: '400px', width: 'fit-content' }} elevation={0}>
      <CardContent>
        <SummaryTable data={getSolverInfo(solver, t)} alignTitle={'left'} sx={{ width: '100%' }} />
        <Stack paddingInline={1}>
          <Typography variant={'subtitle2'}>{t('COMMON.FILE')}</Typography>
          <SolverFileCard variant={'outlined'} solverId={solverId} />
        </Stack>
      </CardContent>
    </Card>
  );
};

function getSolverInfo(solver: Solver, t: TFunction): SummaryEntry[] {
  return [
    { title: t('COMMON.TITLE'), value: solver.name },
    { title: t('STATUS.ACTIVE'), value: solver.active, type: 'boolean' },
    { title: t('COMMON.DESCRIPTION'), value: solver.description },
    { title: t('COMMON.DATE_CREATED'), value: solver.created, type: 'dateTime' },
    { title: t('COMMON.AUTHOR'), value: solver.authorName },
  ];
}

import { Typography } from '@mui/material';
import { FileCard, FileCardProps } from '@pspod/ui-components';
import { FC } from 'react';

import { useGetSolverFile } from '~/use-cases/get-solver-file.hook';

interface SolverFileCardProps {
  solverId: string;
  size?: FileCardProps['previewSize'];
  variant?: FileCardProps['variant'];
}

export const SolverFileCard: FC<SolverFileCardProps> = ({ solverId, size, variant }) => {
  const { fileCardProps, isFetching, isFetched } = useGetSolverFile(solverId);

  if (isFetched && !fileCardProps?.name) {
    return (
      <Typography sx={{ opacity: 0.25, width: '100%', textAlign: 'center', marginBottom: 0 }}>
        —
      </Typography>
    );
  }

  return (
    <FileCard
      previewSize={size}
      variant={variant}
      width={'100%'}
      isLoading={isFetching}
      {...fileCardProps}
    />
  );
};

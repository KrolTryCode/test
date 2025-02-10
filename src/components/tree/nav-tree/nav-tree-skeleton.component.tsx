import { Box } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { FC } from 'react';

export const NavTreeSkeleton: FC = () => {
  return (
    <Box padding={0.5}>
      <Skeleton height={34} />
      <Skeleton height={34} />
      <Skeleton width={'90%'} height={34} />
      <Skeleton width={'80%'} height={34} />
      <Skeleton width={'70%'} height={34} />
    </Box>
  );
};

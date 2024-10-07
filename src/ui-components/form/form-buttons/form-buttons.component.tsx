import Stack from '@mui/material/Stack';
import { FC, ReactNode } from 'react';

interface FormButtonsProps {
  children: ReactNode;
  marginTop?: number;
  isSticky?: boolean;
}

export const FormButtons: FC<FormButtonsProps> = ({ marginTop = 1, children, isSticky }) => (
  <Stack
    marginTop={marginTop}
    flexDirection={'row'}
    justifyContent={'flex-end'}
    gap={2}
    position={isSticky ? 'sticky' : 'static'}
    bottom={isSticky ? '-8px' : undefined}
    paddingTop={isSticky ? 1 : 0}
    paddingBottom={isSticky ? 1 : 0}
    bgcolor={theme => theme.palette.background.default}
  >
    {children}
  </Stack>
);

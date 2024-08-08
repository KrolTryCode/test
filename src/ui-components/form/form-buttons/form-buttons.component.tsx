import Stack from '@mui/material/Stack';
import { FC, ReactNode } from 'react';

interface FormButtonsProps {
  children: ReactNode;
  marginTop?: number;
}

export const FormButtons: FC<FormButtonsProps> = ({ marginTop = 1, children }) => (
  <Stack marginTop={marginTop} flexDirection={'row'} justifyContent={'flex-end'} gap={2}>
    {children}
  </Stack>
);

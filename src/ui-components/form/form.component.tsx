import Stack from '@mui/material/Stack';
import { FC, FormEventHandler, ReactNode } from 'react';

import { Preloader } from '../preloader/preloader.component';

import { FormContext, defaultFormValues } from './form.context';
import { CommonFormProps } from './form.type';

interface FormProps extends CommonFormProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
  children: ReactNode;
  gap?: number;
  maxWidth?: number | string;
  isLoading?: boolean;
}

export const Form: FC<FormProps> = ({
  isLoading = false,
  gap = 2,
  maxWidth,
  onSubmit,
  children,
  ...commonProps
}) => (
  <FormContext.Provider value={{ ...defaultFormValues, ...commonProps }}>
    <Stack
      component={'form'}
      role={'form'}
      onSubmit={onSubmit}
      gap={gap}
      width={'100%'}
      maxWidth={maxWidth}
    >
      {children}
    </Stack>
    {isLoading && <Preloader />}
  </FormContext.Provider>
);

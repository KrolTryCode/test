import { Typography, Theme, Stack, StackProps, useMediaQuery } from '@mui/material';
import { FC, ReactNode, useContext } from 'react';

import { FormContext } from '../form.context';
import { CommonFormProps } from '../form.type';

interface FieldsetProps
  extends Pick<
      StackProps,
      'maxWidth' | 'columnGap' | 'rowGap' | 'marginTop' | 'marginBottom' | 'sx'
    >,
    Pick<CommonFormProps, 'legendPosition'> {
  children: ReactNode;
  legend?: string;
  direction?: 'row' | 'column';
}

export const Fieldset: FC<FieldsetProps> = ({
  legend,
  legendPosition,
  children,
  direction = 'row',
  columnGap = 1,
  rowGap = 1,
  ...props
}) => {
  const commonProps = useContext(FormContext);
  const isMd = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  return (
    <Stack
      component={'fieldset'}
      border={'none'}
      flex={1}
      direction={isMd ? direction : 'column'}
      columnGap={columnGap}
      rowGap={rowGap}
      {...props}
    >
      {!!legend && (
        <Typography
          variant={'h5'}
          component={'legend'}
          marginBottom={2}
          width={'100%'}
          display={'flex'}
        >
          {isMd && [legendPosition, commonProps.legendPosition].includes('center') && (
            <Stack flex={commonProps.labelWidth} />
          )}
          <Stack flex={commonProps.inputWidth}>{legend}</Stack>
        </Typography>
      )}
      {children}
    </Stack>
  );
};

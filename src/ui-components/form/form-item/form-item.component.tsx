import { styled, FormControl, FormLabel, Box, Theme, useMediaQuery } from '@mui/material';
import { FC, useContext } from 'react';

import { FormContext } from '../form.context';

import {
  FormItemProps,
  InternalFormControlProps,
  FormControlProps,
  direction,
} from './form-item.type';

const StyledFormControl = styled(
  ({ children, isHidden, isDisabled, className }: FormControlProps & InternalFormControlProps) => (
    <FormControl classes={{ root: className as string }} disabled={isDisabled} hidden={isHidden}>
      {children}
    </FormControl>
  ),
)(({ labelPosition = 'top', labelWidth, isDisabled }) => ({
  flexDirection: direction[labelPosition],

  '& .MuiFormLabel-root': {
    flex: labelWidth,
  },
  ...(isDisabled && {
    pointerEvents: 'none',
    userSelect: 'none',
  }),
}));

export const FormItem: FC<FormItemProps> = ({
  label,
  isRequired,
  showColonAfterLabel,
  children,
  labelPosition,
  labelWidth,
  inputWidth,
  ...formControlProps
}) => {
  const commonProps = useContext(FormContext);
  const isSm = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));

  return (
    <StyledFormControl
      {...formControlProps}
      labelWidth={labelWidth ?? commonProps.labelWidth}
      labelPosition={isSm ? labelPosition ?? commonProps.labelPosition : 'top'}
    >
      <FormLabel hidden={!label} required={isRequired ?? commonProps.isRequired}>
        {label}
        {(showColonAfterLabel ?? commonProps.showColonAfterLabel) && ':'}
      </FormLabel>
      <Box flex={inputWidth ?? commonProps.inputWidth}>{children}</Box>
    </StyledFormControl>
  );
};

import {
  Checkbox,
  FormControlLabel,
  FormControlLabelProps,
  FormGroup,
  styled,
} from '@mui/material';
import { useMemo } from 'react';
import { FieldPath, FieldValues, UseControllerProps, useController } from 'react-hook-form';

import { ValidationError } from '../_validation-error/validation-error.component';

interface FormCheckboxGroupProps<
  TItem extends Record<string, any> = FormControlLabelProps,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  items?: TItem[];
  isDisabled?: boolean;
  valueExpr?: keyof TItem;
  displayExpr?: keyof TItem;
  color?: 'primary' | 'secondary';
  size?: 'small' | 'medium';
  controllerProps: UseControllerProps<TFieldValues, TName>;
}

export function FormCheckboxGroup<
  TItem extends Record<string, any> = FormControlLabelProps,
  TFieldValues extends FieldValues = FieldValues,
>({
  items,
  isDisabled,
  color = 'primary',
  size,
  valueExpr = 'id',
  displayExpr = 'label',
  controllerProps,
}: FormCheckboxGroupProps<TItem, TFieldValues>) {
  const { field, fieldState } = useController(controllerProps);

  const checkboxes = useMemo(
    () =>
      items?.map(item => ({
        ...item,
        id: item[valueExpr],
        label: item[displayExpr],
      })),
    [displayExpr, items, valueExpr],
  );

  return (
    <ValidationError {...fieldState}>
      <FormGroup>
        {checkboxes?.map(({ id, label, ...props }) => (
          <StyledFormControlLabel
            error={!!fieldState.error}
            {...props}
            key={id}
            label={label}
            isDisabled={isDisabled ?? props.isDisabled}
            checked={(field.value as string[])?.includes(id) || false}
            control={
              <Checkbox
                disabled={isDisabled ?? props.isDisabled}
                disableRipple
                size={size}
                color={color}
              />
            }
            onChange={(_, checked: boolean) => {
              const values = field.value ?? [];
              field.onChange(checked ? values.concat(id) : values.filter(v => v !== id));
              field.onBlur();
            }}
          />
        ))}
      </FormGroup>
    </ValidationError>
  );
}

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  paddingBlock: theme.spacing(0.25),
  ':hover:not(.Mui-disabled)': {
    backgroundColor: theme.palette.divider,
    borderRadius: `${theme.shape['borderRadius']}px`,
  },
  '&.Mui-disabled': {
    opacity: 0.5,
  },
  '&.Mui-error .MuiSvgIcon-root': {
    fill: theme.palette.error.main,
  },
}));

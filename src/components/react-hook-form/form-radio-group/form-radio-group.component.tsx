import { Radio, FormControlLabel, RadioGroup } from '@mui/material';
import { SyntheticEvent, useMemo } from 'react';
import { FieldPath, FieldValues, UseControllerProps, useController } from 'react-hook-form';

import { ValidationError } from '../_validation-error/validation-error.component';

interface FormRadioGroupProps<
  TItem extends Record<string, any> = any,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  items?: TItem[];
  isDisabled?: boolean;
  valueExpr?: keyof TItem;
  displayExpr?: keyof TItem;
  color?: 'primary' | 'secondary';
  controllerProps: UseControllerProps<TFieldValues, TName>;
}

export function FormRadioGroup<
  TItem extends Record<string, any> = any,
  TFieldValues extends FieldValues = FieldValues,
>({
  items,
  isDisabled,
  color,
  valueExpr = 'id',
  displayExpr = 'title',
  controllerProps,
}: FormRadioGroupProps<TItem, TFieldValues>) {
  const { field, fieldState } = useController(controllerProps);

  const valueChangedHandler = (_: SyntheticEvent<Element, Event>, value: number) => {
    field.onChange(value);
  };

  const radioItems = useMemo(
    () =>
      items?.map(item => ({
        id: item[valueExpr],
        label: item[displayExpr],
      })),
    [displayExpr, items, valueExpr],
  );

  return (
    <ValidationError {...fieldState}>
      <RadioGroup row>
        {radioItems?.map(item => (
          <FormControlLabel
            key={item.id}
            label={item.label}
            disabled={isDisabled}
            checked={field.value === item.id}
            control={<Radio color={!fieldState.error ? color : 'error'} />}
            onChange={event => valueChangedHandler(event, item.id)}
          />
        ))}
      </RadioGroup>
    </ValidationError>
  );
}

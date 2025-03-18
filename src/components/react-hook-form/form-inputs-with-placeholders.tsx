import { FieldValues, UseControllerProps } from 'react-hook-form';

import { DataType } from '~/api/utils/api-requests';
import { FormInputNumeric } from '~/components/react-hook-form/form-input-numeric/form-input-numeric.component';
import { FormInputText } from '~/components/react-hook-form/form-input-text/form-input-text.component';

interface InputProps<T extends FieldValues> {
  controllerProps: UseControllerProps<T>;
}

export const UUIDInputWithPlaceholder = <T extends FieldValues>({
  controllerProps,
}: InputProps<T>) => {
  return (
    <FormInputText<T>
      mask={'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX'}
      definitions={{ X: /[0-9a-f]/ }}
      controllerProps={controllerProps}
    />
  );
};

export const NumericInputWithPlaceholder = <T extends FieldValues>({
  controllerProps,
  type,
}: InputProps<T> & { type: DataType }) => {
  return (
    <FormInputNumeric<T>
      step={type === DataType.Int ? 1 : 0.01}
      placeholder={type === DataType.Int ? '0' : '0.00'}
      controllerProps={controllerProps}
    />
  );
};

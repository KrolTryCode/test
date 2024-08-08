import { createContext } from 'react';

import { CommonFormProps } from './form.type';

export const defaultFormValues: CommonFormProps = {
  showColonAfterLabel: false,
  labelPosition: undefined,
  legendPosition: undefined,
  labelWidth: 7,
  inputWidth: 5,
  isRequired: undefined,
};

export const FormContext = createContext<CommonFormProps>(defaultFormValues);

export interface FormParameter {
  id: string;
  name: string;
  type: string; //enum?
  defaultValue?: string;
}

export type FormParameterInput = Omit<FormParameter, 'id'>;

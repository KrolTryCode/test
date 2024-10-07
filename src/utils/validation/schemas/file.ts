import * as y from 'yup';

export const fileSchema = y
  .mixed<File>()
  .required()
  .test('file', { key: 'yup:mixed.required' }, file => !!file?.size);

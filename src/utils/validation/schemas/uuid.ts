import * as y from 'yup';

export const UUIDSchema = y
  .string()
  .uuid({ key: 'yup:mixed.required' })
  .required({ key: 'yup:mixed.required' });
export const optionalUUIDSchema = y.string().uuid();

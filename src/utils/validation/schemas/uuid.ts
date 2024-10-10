import * as y from 'yup';

export const UUIDSchema = y.string().uuid({ key: 'yup:mixed.required' }).required();
export const optionalUUIDSchema = y.string().uuid();

import * as y from 'yup';

export const phoneSchema = y.string().length(10, { key: 'yup:custom.phone' }).allowEmptyString();

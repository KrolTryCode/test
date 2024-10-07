import * as y from 'yup';

export const nonEmptyStringYup = y.string().trim().min(1).required();

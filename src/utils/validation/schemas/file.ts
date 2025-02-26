import * as y from 'yup';

export const fileSchema = y.mixed<File>().required({ key: 'yup:custom.fileRequired' });

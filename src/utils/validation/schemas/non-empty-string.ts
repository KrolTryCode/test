import { t } from 'i18next';
import * as y from 'yup';
import * as z from 'zod';

export const nonEmptyStringZod = z
  .string()
  .trim()
  .min(1, { message: t('yup:mixed.required') });

export const nonEmptyStringYup = y.string().trim().min(1).required({ key: 'yup:mixed.required' });

export const nonEmptyUUID = z.string().uuid({ message: t('yup:mixed.required') });

export const uuidYup = y.string().uuid({ key: 'yup:mixed.required' });

export const phoneSchema = z
  .string()
  .length(10, { message: t('ERROR.INCORRECT', { what: t('USER.PHONE_NUMBER')?.toLowerCase() }) });

export const nonEmptyFile = y
  .mixed<File>()
  .required()
  .test('file', t('yup:mixed.required'), file => !!file?.size);

export const optionalUUID = y.string().uuid().allowEmptyString();

export const stringMax255Schema = y.string().max(255);
export const stringMax1000Schema = y.string().max(1000);

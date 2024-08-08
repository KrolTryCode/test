import * as y from 'yup';

export interface SendEmailForm {
  email: string;
}

export const schema: y.ObjectSchema<SendEmailForm> = y.object({
  email: y.string().email().default('').required(),
});

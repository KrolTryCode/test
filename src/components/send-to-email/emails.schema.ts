import * as y from 'yup';

export type EmailsListType = { emails: { email: string }[] };

export const schema = y.object({
  emails: y
    .array(
      y.object({
        email: y.string().email().required().default(''),
      }),
    )
    .required()
    .default([{ email: '' }]),
});

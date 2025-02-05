import { it, describe, expect } from 'vitest';

import { schema, ICreateAccountForm } from './create-account-form.schema';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string): string => key,
  }),
}));

const correctFormData: ICreateAccountForm = {
  email: 'test@email.com',
  firstName: 'name',
  lastName: 'lastname',
};

describe('Create account form', () => {
  it('should pass with correct data', async () => {
    await expect(schema.isValid({ ...correctFormData })).resolves.toBeTruthy();
  });

  it('should fail with wrong data', async () => {
    await expect(schema.isValid({})).resolves.toBeFalsy();
    await expect(
      schema.isValid({ ...correctFormData, email: 'bademail....@.@' }),
    ).resolves.toBeFalsy();
    await expect(schema.isValid({ ...correctFormData, firstName: '' })).resolves.toBeFalsy();
    await expect(schema.isValid({ ...correctFormData, lastName: '' })).resolves.toBeFalsy();
  });
});

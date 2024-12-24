import { describe, expect, it } from 'vitest';

import { useUserStore } from '~/app/user/user.store';
import {
  ICreateTokenForm,
  schema,
} from '~/pages/projects/project/settings/token/generate-token.schema';

const correctFormData: ICreateTokenForm = {
  name: 'Токен',
  description: 'Описание токена',
  expirationDate: new Date('3025-11-07T03:45:00.000'),
  roleId: '5aede493-9b59-4b85-a04e-ee53e49c7b2e',
};

describe('Generate token form', () => {
  it('should pass with correct data', async () => {
    useUserStore.setState({
      data: { user: { userTimeZone: { systemTitle: 'Atlantic/Reykjavik' } } },
    });
    expect(await schema.isValid(correctFormData)).toBeTruthy();
    expect(await schema.isValid({ ...correctFormData, description: '' })).toBeTruthy();
  });

  it('should fail with empty data', async () => {
    expect(await schema.isValid({})).toBeFalsy();
    expect(await schema.isValid({ ...correctFormData, name: '' })).toBeFalsy();
    expect(await schema.isValid({ ...correctFormData, expirationDate: null })).toBeFalsy();
    expect(await schema.isValid({ ...correctFormData, roleId: '' })).toBeFalsy();
  });

  it('should fail with wrong (past) date', async () => {
    expect(await schema.isValid({ ...correctFormData, expirationDate: '' })).toBeFalsy();
    expect(
      await schema.isValid({
        ...correctFormData,
        expirationDate: new Date('2020-01-01T01:23:45.678'),
      }),
    ).toBeFalsy();
  });
});

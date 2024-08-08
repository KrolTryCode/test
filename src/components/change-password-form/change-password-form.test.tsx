import { screen } from '@testing-library/react';
import { t } from 'i18next';
import { it, describe, expect } from 'vitest';

import { passwordConfiguration } from 'tests/__mocks__/api-client.mock';
import { renderComponent } from 'tests/utils/render-component';

import { ChangePasswordForm } from './change-password-form.component';
import {
  getSchema,
  ChangePasswordForm as IChangePasswordForm,
} from './change-password-form.schema';

const correctFormData: IChangePasswordForm = {
  password: 'abc!qA23',
  confirmedPassword: 'abc!qA23',
};

const onSave = vi.fn().mockReturnValue(() => Promise.resolve());

describe('Change password form', () => {
  let schema: ReturnType<typeof getSchema>;

  beforeAll(() => {
    renderComponent(<ChangePasswordForm username={'test@mail.com'} onSave={onSave} />, {
      withRouter: true,
    });

    schema = getSchema(passwordConfiguration, t);
  });

  it('should render the change password form', async () => {
    expect(await screen.findByText('Задать пароль')).toBeInTheDocument();
    const container = await screen.findByRole('form');
    expect(container).toMatchSnapshot();
  });

  it('should pass with correct data', async () => {
    expect(await schema.isValid(correctFormData)).toBeTruthy();
  });

  it('should fail with wrong data', async () => {
    expect(await schema.isValid({})).toBeFalsy();
    expect(await schema.isValid({ ...correctFormData, confirmedPassword: '123' })).toBeFalsy();

    const weakpas = 'weakpas';
    expect(
      await schema.isValid({ ...correctFormData, confirmedPassword: weakpas, password: weakpas }),
    ).toBeFalsy();
  });
});

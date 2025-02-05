import { act, fireEvent, screen } from '@testing-library/react';
import { it, describe, expect } from 'vitest';

import { mockedNavigate } from 'tests/__mocks__/@tanstack/react-router.mock';
import { mockGetCurrentUser } from 'tests/__mocks__/api-client.mock';
import { renderComponent } from 'tests/utils/render-component';
import { homePath } from '~/utils/configuration/routes-paths';

import { LoginForm } from './login-form';
import { schema, ILoginForm } from './login-form.schema';

describe.skip('Login form', () => {
  beforeEach(() => {
    renderComponent(<LoginForm onSave={() => undefined} />, { withRouter: true });
  });

  it.skip('should render login form', async () => {
    expect(await screen.findByText('Войти')).toBeInTheDocument();
    const container = await screen.findByRole('form');
    expect(container).toMatchSnapshot();
  });

  // TODO:? need to mock redux actions
  it.skip('should navigate after login', async () => {
    const submit = await screen.findByText('Войти');
    expect(submit).toBeInTheDocument();

    const inputs = screen.getAllByRole('textbox');
    expect(inputs).toHaveLength(2);

    expect(inputs[0]).toHaveAttribute('type', 'text');
    expect(inputs[1]).toHaveAttribute('type', 'password');

    if (submit) {
      const [username, password] = inputs;

      act(() => {
        fireEvent.change(username, { target: { value: 'system' } });
        fireEvent.change(password, { target: { value: 'test' } });
        fireEvent.click(submit);
      });

      expect(mockGetCurrentUser).toHaveBeenCalledTimes(1);
      expect(mockedNavigate).toHaveBeenCalledWith(homePath);
    }
  });
});

const correctFormData: ILoginForm = {
  username: 'Test',
  password: 'Test',
  rememberMe: false,
};

describe('Login form data', () => {
  it('should pass with correct data', async () => {
    await expect(schema.isValid({ ...correctFormData })).resolves.toBeTruthy();
  });

  it('should fail with wrong data', async () => {
    await expect(schema.isValid({})).resolves.toBeFalsy();
    await expect(schema.isValid(schema.getDefault())).resolves.toBeFalsy();
  });
});

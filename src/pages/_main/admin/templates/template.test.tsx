import { screen } from '@testing-library/react';
import { it, describe, expect } from 'vitest';

import { mockGetTemplates } from 'tests/__mocks__/api-client.mock';
import { renderComponent } from 'tests/utils/render-component';
import { CreateTemplateRequest } from '~/api/utils/api-requests';

import { schema } from './template-form/template-form.schema';

import { TemplatesPage } from '.';

const correctFormData: CreateTemplateRequest = {
  name: 'Template name',
  content:
    '<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><title>Код реактивации аккаунта</title></head><body><div>Ваш код реактивации: <br><b>${activationCode}</b> <br><a href="${activationUrl}">Или нажмите на эту ссылку</a></div><br/></body></html>',
};

describe('Create template form', () => {
  it('should pass with correct data', async () => {
    const parsed = schema.isValid({ ...correctFormData });
    await expect(parsed).resolves.toBeTruthy();
  });

  it('should fail with empty data', async () => {
    await expect(schema.isValid({})).resolves.toBeFalsy();
    await expect(
      schema.isValid({ ...correctFormData, name: '', content: '' }),
    ).resolves.toBeFalsy();
  });
});

describe.skip('Templates page', () => {
  beforeAll(() => {
    renderComponent(<TemplatesPage />, { withRouter: true });
  });

  it('renders the templates', async () => {
    const dataGrid = await screen.findByRole('grid');
    const columns = await screen.findAllByRole('columnheader');
    expect(dataGrid).toBeInTheDocument();
    expect(columns).toHaveLength(4);
    expect(mockGetTemplates).toHaveBeenCalledTimes(1);

    expect(dataGrid).toMatchSnapshot();
  });
});

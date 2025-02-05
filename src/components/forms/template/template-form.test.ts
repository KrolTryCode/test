import { CreateTemplateRequest } from '~/api/utils/api-requests';

import { schema } from './template-form.schema';

const correctFormData: CreateTemplateRequest = {
  name: 'Template name',
  content:
    '<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><title>Код реактивации аккаунта</title></head><body><div>Ваш код реактивации: <br><b>${activationCode}</b> <br><a href="${activationUrl}">Или нажмите на эту ссылку</a></div><br/></body></html>',
};

describe('Template form', () => {
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

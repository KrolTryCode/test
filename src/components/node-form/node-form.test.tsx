import { t } from 'i18next';
import { describe, expect, it } from 'vitest';

import { ContentNodeType, CreateContentNodeRequest } from '~/api/utils/api-requests';
import { getSchema } from '~/components/node-form/node-form.schema';

const correctFormData: CreateContentNodeRequest = {
  name: 'Таблица на странице',
  projectId: '268ea6a3-cecb-4350-a430-9d215230d93c',
  parentId: 'faa39179-dca8-4054-88ad-83990086b309',
  type: ContentNodeType.Table,
};

const schema = getSchema(['Таблица'], t);

describe('Node form', () => {
  it('should pass with correct data', async () => {
    expect(await schema.isValid(correctFormData)).toBeTruthy();
    expect(await schema.isValid({ ...correctFormData, parentId: undefined })).toBeTruthy();
    expect(await schema.isValid({ ...correctFormData, parentId: '' })).toBeTruthy();
    expect(
      await schema.isValid({ ...correctFormData, type: ContentNodeType.Directory }),
    ).toBeTruthy();
  });

  it('should fail with wrong data', async () => {
    expect(await schema.isValid({})).toBeFalsy();
    expect(await schema.isValid({ ...correctFormData, name: '' })).toBeFalsy();
    expect(await schema.isValid({ ...correctFormData, name: 'Таблица' })).toBeFalsy();
    expect(await schema.isValid({ ...correctFormData, type: '' })).toBeFalsy();
    expect(await schema.isValid({ ...correctFormData, projectId: '' })).toBeFalsy();
  });
});

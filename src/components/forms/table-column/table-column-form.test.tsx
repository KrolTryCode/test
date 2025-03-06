import { t } from 'i18next';
import { describe, expect, it } from 'vitest';

import { DataType } from '~/api/utils/api-requests';

import { getSchema, ITableColumnForm } from './table-column-form.schema';

const correctFormData: ITableColumnForm = {
  name: 'Test',
  type: DataType.String,
  required: false,
  unique: false,
};

const schema = getSchema(['Столбец'], t);

describe('Table column form', () => {
  it('should pass with correct data', async () => {
    expect(await schema.isValid(correctFormData)).toBeTruthy();
  });

  it('should fail with wrong data', async () => {
    expect(await schema.isValid({})).toBeFalsy();
    expect(await schema.isValid({ ...correctFormData, name: '' })).toBeFalsy();
    expect(await schema.isValid({ ...correctFormData, name: 'Столбец' })).toBeFalsy();
    expect(await schema.isValid({ ...correctFormData, name: undefined })).toBeFalsy();
    expect(await schema.isValid({ ...correctFormData, type: '' })).toBeFalsy();
  });
});

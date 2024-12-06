import { t } from 'i18next';
import { describe, expect, it } from 'vitest';

import { ColumnDefinition, ColumnType } from '~/api/utils/api-requests';
import { getSchema } from '~/pages/tables/table-structure/add-column/add-column-form.schema';

const correctFormData: ColumnDefinition = {
  name: 'Столбец123',
  columnType: ColumnType.Integer,
};
const schema = getSchema(['Столбец'], t);

describe('Add column form', () => {
  it('should pass with correct data', async () => {
    expect(await schema.isValid(correctFormData)).toBeTruthy();
  });

  it('should fail with wrong data', async () => {
    expect(await schema.isValid({})).toBeFalsy();
    expect(await schema.isValid({ ...correctFormData, name: '' })).toBeFalsy();
    expect(await schema.isValid({ ...correctFormData, name: 'Столбец' })).toBeFalsy();
    expect(await schema.isValid({ ...correctFormData, name: undefined })).toBeFalsy();
    expect(await schema.isValid({ ...correctFormData, columnType: '' })).toBeFalsy();
  });
});

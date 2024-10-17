import { matchIsValidTel } from 'mui-tel-input';
import * as y from 'yup';

export const phoneSchema = y.string().test('valid-phone', { key: 'yup:custom.phone' }, value => {
  if (!value) {
    return true;
  }

  return matchIsValidTel(value);
});

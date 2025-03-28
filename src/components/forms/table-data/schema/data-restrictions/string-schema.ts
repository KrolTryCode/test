import { t } from 'i18next';
import * as y from 'yup';

import { CheckOpcode, TableCheck } from '~/api/utils/api-requests';
import { getRightOrLeftValue } from '~/components/forms/table-data/schema/data-restrictions/utils';

export const stringDataRestrictionsSchema = (checks: TableCheck[]) => {
  let schema = y.string();
  checks.forEach(check => {
    const { opCode, rightValue } = check.check;
    const value = getRightOrLeftValue(rightValue.value);

    switch (opCode) {
      case CheckOpcode.GT:
        schema = schema.test(
          'string-length-gt',
          t('CHECKS.STRING_TYPE.GT', { what: value }),
          val => !!val && val.length > Number(value),
        );
        break;
      case CheckOpcode.GE:
        schema = schema.test(
          'string-length-ge',
          t('CHECKS.STRING_TYPE.GE', { what: value }),
          val => !!val && val.length >= Number(value),
        );
        break;
      case CheckOpcode.LT:
        schema = schema.test(
          'string-length-lt',
          t('CHECKS.STRING_TYPE.LT', { what: value }),
          val => !!val && val.length < Number(value),
        );
        break;
      case CheckOpcode.LE:
        schema = schema.test(
          'string-length-le',
          t('CHECKS.STRING_TYPE.LE', { what: value }),
          val => !!val && val.length <= Number(value),
        );
        break;
      case CheckOpcode.NEQ:
        schema = schema.test(
          'string-value-neq',
          t('CHECKS.STRING_TYPE.NEQ', { what: value }),
          val => !val || val !== value,
        );
        break;
      case CheckOpcode.IN:
        // TODO Fix app backend https://gitlab.spbpu.com/customprojects/indanis/app/-/merge_requests/149
        //if (Array.isArray(rightValue)) {
        //  schema = schema.test(
        //    'string-in-array',
        //    `Строка должна быть одним из значений: ${rightVal.join(', ')}`,
        //    value => !value || rightValue.includes(value.length),
        //  );
        //}
        break;
      case CheckOpcode.MATCH: {
        const regex = new RegExp(value as string);
        schema = schema.test(
          'string-regex-match',
          t('CHECKS.STRING_TYPE.MATCH', { what: value }),
          val => !val || regex.test(val),
        );
        break;
      }
    }
  });

  return schema;
};

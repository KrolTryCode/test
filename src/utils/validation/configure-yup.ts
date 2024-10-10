import * as Yup from 'yup';

import { UUID_REGEXP_PATTERN } from '~/utils/helpers/uuid-regexp';

import { ruLocale } from './locales/ru-locale';
import { emailRe } from './utils/regexp';

export const configureYup = (language: string) => {
  Yup.setLocale(language === 'ru' ? ruLocale : Yup.defaultLocale);
  setCustomMethods();
};

function setCustomMethods() {
  Yup.addMethod(Yup.string, 'allowEmptyString', function allowEmptyString() {
    return this.transform((val: string, orig: string) => {
      return orig === '' ? undefined : val;
    });
  });

  Yup.addMethod(Yup.string, 'uuid', function validateUuid(message?: string) {
    return this.matches(UUID_REGEXP_PATTERN, {
      message: message ?? { key: 'yup:string.uuid' },
      name: 'uuid',
      excludeEmptyString: true,
    });
  });

  // https://github.com/jquense/yup?tab=readme-ov-file#stringemailmessage-string--function-schema
  Yup.addMethod(Yup.string, 'email', function validateEmail(message?: string) {
    return this.matches(emailRe, {
      message: message ?? { key: 'yup:string.email' },
      name: 'email',
      excludeEmptyString: true,
    });
  });
}

import * as Yup from 'yup';

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

  // https://github.com/jquense/yup?tab=readme-ov-file#stringemailmessage-string--function-schema
  Yup.addMethod(Yup.string, 'email', function validateEmail(message?: string) {
    return this.matches(emailRe, {
      message: message ?? { key: 'yup:string.email' },
      name: 'email',
      excludeEmptyString: true,
    });
  });
}

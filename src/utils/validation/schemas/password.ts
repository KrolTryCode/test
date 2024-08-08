import { TFunction } from 'i18next';
import * as y from 'yup';

import { AccountConfiguration } from '~/api/utils/api-requests';

import { hasAlphabetSequence } from '../utils/has-alphabet-sequence';
import { hasRepetitions } from '../utils/has-n-repetitions';
import { numberRe, lowercaseRe, uppercaseRe, specialCharRe, noWhitespaceRe } from '../utils/regexp';

export const getPasswordSchema = (passwordConfig: AccountConfiguration, t: TFunction) => {
  const passwordLengthMessage = t('AUTH.PASSWORD.RULES.LENGTH', {
    min: passwordConfig.minPasswordLength,
    max: passwordConfig.maxPasswordLength,
  });

  let schema = y.string();

  if (passwordConfig.minPasswordLength !== undefined) {
    schema = schema.min(passwordConfig.minPasswordLength, passwordLengthMessage);
  }

  if (passwordConfig.maxPasswordLength !== undefined) {
    schema = schema.max(passwordConfig.maxPasswordLength, passwordLengthMessage);
  }

  if (passwordConfig.requireUppercasePassword) {
    schema = schema.matches(uppercaseRe, t('AUTH.PASSWORD.RULES.UPPER'));
  }

  if (passwordConfig.requireLowercasePassword) {
    schema = schema.matches(lowercaseRe, t('AUTH.PASSWORD.RULES.LOWER'));
  }

  if (passwordConfig.requireDigitPassword) {
    schema = schema.matches(numberRe, t('AUTH.PASSWORD.RULES.NUMBER'));
  }

  if (passwordConfig.requireSpecialPassword) {
    schema = schema.matches(specialCharRe, t('AUTH.PASSWORD.RULES.SPECIAL'));
  }

  if (passwordConfig.noWhitespacePassword) {
    schema = schema.matches(noWhitespaceRe, t('AUTH.PASSWORD.RULES.WHITESPACE'));
  }

  if (passwordConfig.maxRepeatCharacterLengthPassword !== undefined) {
    schema = schema.test({
      test: password =>
        !hasRepetitions(password ?? '', passwordConfig.maxRepeatCharacterLengthPassword ?? 0),
      message: t('AUTH.PASSWORD.RULES.REPETITIONS', {
        count: passwordConfig.maxRepeatCharacterLengthPassword,
      }),
    });
  }

  if (passwordConfig.maxAlphabeticalSequenceLengthPassword !== undefined) {
    schema = schema.test({
      test: password =>
        !hasAlphabetSequence(
          password ?? '',
          passwordConfig.maxAlphabeticalSequenceLengthPassword ?? 0,
        ),
      message: t('AUTH.PASSWORD.RULES.ALPHABET', {
        count: passwordConfig.maxAlphabeticalSequenceLengthPassword,
      }),
    });
  }

  return schema;
};

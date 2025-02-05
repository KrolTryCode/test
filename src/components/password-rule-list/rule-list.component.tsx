import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { AccountConfiguration } from '~/api/utils/api-requests';

import { StyledList, StyledListItem } from './rule-list.style';

interface PasswordRuleListProps {
  config: AccountConfiguration;
}

export const PasswordRuleList: FC<PasswordRuleListProps> = ({ config }) => {
  const { t } = useTranslation();

  return (
    <StyledList>
      {(config.minPasswordLength ?? config.maxPasswordLength) && (
        <StyledListItem>
          {t('AUTH.PASSWORD.RULES.LENGTH', {
            min: config.minPasswordLength,
            max: config.maxPasswordLength,
          })}
        </StyledListItem>
      )}
      {config.requireDigitPassword && (
        <StyledListItem>{t('AUTH.PASSWORD.RULES.NUMBER')}</StyledListItem>
      )}
      {config.requireUppercasePassword && (
        <StyledListItem>{t('AUTH.PASSWORD.RULES.UPPER')}</StyledListItem>
      )}
      {config.requireLowercasePassword && (
        <StyledListItem>{t('AUTH.PASSWORD.RULES.LOWER')}</StyledListItem>
      )}
      {config.requireSpecialPassword && (
        <StyledListItem>{t('AUTH.PASSWORD.RULES.SPECIAL')}</StyledListItem>
      )}
      {config.noWhitespacePassword && (
        <StyledListItem>{t('AUTH.PASSWORD.RULES.WHITESPACE')}</StyledListItem>
      )}
      {config.maxRepeatCharacterLengthPassword !== undefined && (
        <StyledListItem>
          {t('AUTH.PASSWORD.RULES.REPETITIONS', {
            count: config.maxRepeatCharacterLengthPassword,
          })}
        </StyledListItem>
      )}
      {config.maxAlphabeticalSequenceLengthPassword && (
        <StyledListItem>
          {t('AUTH.PASSWORD.RULES.ALPHABET', {
            count: config.maxAlphabeticalSequenceLengthPassword,
          })}
        </StyledListItem>
      )}
    </StyledList>
  );
};

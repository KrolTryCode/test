import { t } from 'i18next';

export const translateStatus = (status: string = 'undefined'): string =>
  t(`STATUS.${status.toUpperCase()}`);

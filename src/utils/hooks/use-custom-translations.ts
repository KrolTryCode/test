import { useTranslation } from 'react-i18next';

export const useCustomTranslations = () => {
  const { t } = useTranslation();

  const translateStatus = (status: string = 'undefined'): string =>
    t(`STATUS.${status.toUpperCase()}`);

  const translateColumnType = (type: string = 'undefined'): string =>
    t(`COLUMN_TYPE.${type.toUpperCase()}`);

  return { t, translateStatus, translateColumnType };
};

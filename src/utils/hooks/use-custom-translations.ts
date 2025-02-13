import { useTranslation } from 'react-i18next';

export const useCustomTranslations = () => {
  const { t } = useTranslation();

  const translateStatus = (status: string = 'undefined'): string =>
    t(`STATUS.${status.toUpperCase()}`);

  const translateEntity = (entity: string = 'undefined'): string =>
    t(`ENTITY.${entity.toUpperCase()}`);

  const translateColumnType = (type: string = 'undefined'): string =>
    t(`COLUMN_TYPE.${type.toUpperCase()}`);

  const translateCheckType = (type: string = 'undefined'): string =>
    t(`CHECK_TYPE.${type.toUpperCase()}`);

  const translateColorPalette = (color: string = 'undefined'): string =>
    t(`COLORS.${color.toUpperCase()}`);

  function getStatusValueOptions<T extends string | undefined>(statuses: T[]) {
    return statuses.map(status => ({
      value: status,
      label: translateStatus(status),
    }));
  }

  return {
    t,
    translateStatus,
    translateEntity,
    translateColumnType,
    translateCheckType,
    translateColorPalette,
    getStatusValueOptions,
  };
};

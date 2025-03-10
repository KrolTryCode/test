import { useTranslation } from 'react-i18next';

export const useCustomTranslations = () => {
  const { t } = useTranslation();

  const translateStatus = (status: string = 'undefined'): string =>
    t(`STATUS.${status.toUpperCase()}`);

  const translateEntity = (entity: string = 'undefined'): string =>
    t(`ENTITY.${entity.toUpperCase()}`);

  const translateColumnType = (type: string = 'undefined'): string =>
    t(`COLUMN_TYPE.${type.toUpperCase()}`);

  const translateCheckOperatorType = (type: string = 'undefined'): string =>
    t(`CHECKS.TYPE.${type.toUpperCase()}`);

  const translateColorPalette = (color: string = 'undefined'): string =>
    t(`COLORS.${color.toUpperCase()}`);

  function getStatusValueOptions<T extends string | undefined>(statuses: T[]) {
    return statuses.map(status => ({
      value: status,
      label: translateStatus(status),
    }));
  }

  function getColumnTypeValueOptions<T extends string | undefined>(types: T[]) {
    return types.map(type => ({
      value: type,
      label: translateColumnType(type),
    }));
  }

  function getCheckOperatorsValueOptions<T extends string | undefined>(types: T[]) {
    return types.map(type => ({
      value: type,
      label: translateCheckOperatorType(type),
    }));
  }

  return {
    t,
    translateStatus,
    translateEntity,
    translateColumnType,
    translateCheckOperatorType,
    translateColorPalette,
    getStatusValueOptions,
    getColumnTypeValueOptions,
    getCheckOperatorsValueOptions,
  };
};

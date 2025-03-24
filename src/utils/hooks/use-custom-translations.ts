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

  const translateStringCheckOperatorType = (type: string = 'undefined'): string =>
    t(`CHECKS.STRING_TYPE.${type.toUpperCase()}`);

  const translateColorPalette = (color: string = 'undefined'): string =>
    t(`COLORS.${color.toUpperCase()}`);

  const translateTableRelationshipTypes = (type: string = 'undefined'): string =>
    t(`TABLE_RELATIONSHIP.TYPE_LIST.${type.toUpperCase()}`);

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

  function getTableRelationshipTypesValueOptions<T extends string | undefined>(types: T[]) {
    return types.map(type => ({
      value: type,
      label: translateTableRelationshipTypes(type),
    }));
  }

  return {
    t,
    translateStatus,
    translateEntity,
    translateColumnType,
    translateCheckOperatorType,
    translateStringCheckOperatorType,
    translateColorPalette,
    translateTableRelationshipTypes,
    getStatusValueOptions,
    getColumnTypeValueOptions,
    getCheckOperatorsValueOptions,
    getTableRelationshipTypesValueOptions,
  };
};

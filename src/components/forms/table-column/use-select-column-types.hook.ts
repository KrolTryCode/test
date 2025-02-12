import { DataType } from '~/api/utils/api-requests';
import { useCustomTranslations } from '~/utils/hooks';

export const useSelectColumnTypes = () => {
  const { translateColumnType } = useCustomTranslations();

  const selectColumnTypes = Object.entries(DataType).map(([id, name]) => ({
    id,
    name: translateColumnType(name),
  }));

  return { selectColumnTypes };
};

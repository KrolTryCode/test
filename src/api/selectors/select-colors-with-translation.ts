import { TFunction } from 'i18next';

import { ColorPallet } from '~/api/utils/api-requests';

export const selectTranslatedColors = (data: ColorPallet[], t: TFunction) => {
  return data.map(color => ({ ...color, title: t(`COLORS.${color.title.toUpperCase()}`) }));
};

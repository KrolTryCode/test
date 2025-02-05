import { t } from 'i18next';

import { ContentNodeType } from '~/api/utils/api-requests';

const typeLocaleMap = {
  [ContentNodeType.Table]: t('ENTITY.TABLE'),
  [ContentNodeType.Directory]: t('ENTITY.DIRECTORY'),
};

export const selectNodeTypes = Object.entries(typeLocaleMap).map(([id, name]) => ({ id, name }));

import { t } from 'i18next';

import { CreateContentNodeRequestTypeEnum } from '~/api/utils/api-requests';

const typeLocaleMap = {
  [CreateContentNodeRequestTypeEnum.Table]: t('ENTITY.TABLE'),
  [CreateContentNodeRequestTypeEnum.Directory]: t('ENTITY.DIRECTORY'),
};

export const selectNodeTypes = Object.entries(typeLocaleMap).map(([id, name]) => ({ id, name }));

import { t } from 'i18next';

import { CreateProjectNodeRequestTypeEnum } from '~/api/utils/api-requests';

const typeLocaleMap = {
  [CreateProjectNodeRequestTypeEnum.Project]: t('ENTITY.PROJECT'),
  [CreateProjectNodeRequestTypeEnum.Group]: t('ENTITY.GROUP'),
};

export const selectProjectNodeTypes = Object.entries(typeLocaleMap).map(([id, name]) => ({
  id,
  name,
}));

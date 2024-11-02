import { t } from 'i18next';

import { ProjectNodeType } from '~/api/utils/api-requests';

const typeLocaleMap = {
  [ProjectNodeType.Project]: t('ENTITY.PROJECT'),
  [ProjectNodeType.Group]: t('ENTITY.GROUP'),
};

export const selectProjectNodeTypes = Object.entries(typeLocaleMap).map(([id, name]) => ({
  id,
  name,
}));

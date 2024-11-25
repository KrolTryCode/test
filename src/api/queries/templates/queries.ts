import { createQueryKeys } from '@lukemorales/query-key-factory';

import { ApiClientSecured } from '~/api/utils/api-client';

export const templateQueries = createQueryKeys('templates', {
  single: (templateId: string) => ({
    queryKey: [templateId],
    queryFn: () => ApiClientSecured.templatesV1Controller.getTemplateById(templateId),
  }),
  list: {
    queryKey: null,
    queryFn: () => ApiClientSecured.templatesV1Controller.getAllTemplates(),
  },
});

import { createQueryKeys } from '@lukemorales/query-key-factory';

import { ApiClientSecured } from '~/api/utils/api-client';
import { Configuration } from '~/components/configuration-form/configuration-form.type';

export const settingsQueries = createQueryKeys('settings', {
  moduleList: {
    queryKey: ['modules'],
    queryFn: () => ApiClientSecured.moduleConfigurationController.getModules(),
  },
  moduleConfiguration: (name: string, path: string) => ({
    queryKey: ['modules', name],
    queryFn: () =>
      ApiClientSecured.request<Configuration>({
        secure: true,
        method: 'GET',
        path,
      }),
  }),
  passwordConfiguration: {
    queryKey: ['password'],
    queryFn: () => ApiClientSecured.applicationController.accountConfiguration(),
  },
});

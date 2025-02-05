import { createQueryKeys } from '@lukemorales/query-key-factory';

import { ApiClientSecured } from '~/api/utils/api-client';

export type Configuration = Record<string, string | number | boolean>;

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
  linksConfiguration: () => ({
    queryKey: ['links'],
    queryFn: () => ApiClientSecured.linksConfigurationV1Controller.getLinksConfiguration(),
  }),
});

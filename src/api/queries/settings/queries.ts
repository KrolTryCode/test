import { createQueryKeys } from '@lukemorales/query-key-factory';

import { ApiClientSecured } from '~/api/utils/api-client';

export type Configuration = Record<string, string | number | boolean>;

export const settingsQueries = createQueryKeys('settings', {
  moduleList: {
    queryKey: null,
    queryFn: () => ApiClientSecured.moduleConfigurationController.getModules(),
  },
  moduleConfiguration: (name: string, path: string) => ({
    queryKey: [name],
    queryFn: () =>
      ApiClientSecured.request<Configuration>({
        secure: true,
        method: 'GET',
        path,
      }),
  }),
  passwordConfiguration: {
    queryKey: null,
    queryFn: () => ApiClientSecured.applicationController.accountConfiguration(),
  },
  linksConfiguration: {
    queryKey: null,
    queryFn: () => ApiClientSecured.linksConfigurationV1Controller.getLinksConfiguration(),
  },
});

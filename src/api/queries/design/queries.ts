import { createQueryKeys } from '@lukemorales/query-key-factory';

import { ApiClient } from '~/api/utils/api-client';

export const designQueries = createQueryKeys('design', {
  palettes: {
    queryKey: null,
    queryFn: () => ApiClient.applicationDesignController.getColorPallets(),
  },
  logo: (type: 'mainLogo' | 'loginLogo') => ({
    queryKey: [type],
    queryFn: () => ApiClient.applicationDesignController.getLogo(type, { format: 'blob' }),
  }),
  configuration: {
    queryKey: null,
    queryFn: () => ApiClient.designConfigurationV1Controller.getDesignConfiguration(),
  },
});

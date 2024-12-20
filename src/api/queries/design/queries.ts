import { createQueryKeys } from '@lukemorales/query-key-factory';

import { ApiClient } from '~/api/utils/api-client';

export const designQueries = createQueryKeys('design', {
  palettes: () => ({
    queryKey: ['color-palettes'],
    queryFn: () => ApiClient.applicationDesignController.getColorPallets(),
  }),
  logo: (type: 'mainLogo' | 'loginLogo') => ({
    queryKey: ['logo', type],
    queryFn: () => ApiClient.applicationDesignController.getLogo(type, { format: 'blob' }),
  }),
  designConfiguration: () => ({
    queryKey: ['design-configuration'],
    queryFn: () => ApiClient.designConfigurationV1Controller.getDesignConfiguration(),
  }),
});

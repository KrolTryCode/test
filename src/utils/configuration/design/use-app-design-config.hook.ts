import { useQuery } from '@tanstack/react-query';

import { getColorPalettesQueryOptions } from '~/api/queries/design/get-color-palettes.query';
import { getDesignConfigurationQueryOptions } from '~/api/queries/design/get-design-configuration.query';
import { getDesignLogoQueryOptions } from '~/api/queries/design/get-design-logo.query';

export const useAppDesignConfig = () => {
  const { data: appMainLogo } = useQuery(getDesignLogoQueryOptions('mainLogo'));
  const { data: appLoginLogo } = useQuery(getDesignLogoQueryOptions('loginLogo'));
  const { data: configuration } = useQuery(getDesignConfigurationQueryOptions());
  const { data: appColorPalettes } = useQuery(getColorPalettesQueryOptions());

  return {
    appMainLogo,
    appLoginLogo,
    appColorPalettes,
    appHelloText: configuration?.loginPageText,
    currentColorPalletId: configuration?.colorPalletId,
  };
};

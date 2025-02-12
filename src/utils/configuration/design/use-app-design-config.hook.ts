import { useGetColorPalettesQuery } from '~/api/queries/design/get-color-palettes.query';
import { useGetDesignConfigurationQuery } from '~/api/queries/design/get-design-configuration.query';
import { useGetDesignLogoQuery } from '~/api/queries/design/get-design-logo.query';

export const useAppDesignConfig = () => {
  const { data: appMainLogo } = useGetDesignLogoQuery('mainLogo');
  const { data: appLoginLogo } = useGetDesignLogoQuery('loginLogo');
  const { data: configuration } = useGetDesignConfigurationQuery();
  const { data: appColorPalettes } = useGetColorPalettesQuery();

  return {
    appMainLogo,
    appLoginLogo,
    appColorPalettes,
    appHelloText: configuration?.loginPageText,
    currentColorPalletId: configuration?.colorPalletId,
  };
};

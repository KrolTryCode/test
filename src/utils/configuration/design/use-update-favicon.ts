import { useEffect, useMemo } from 'react';

import { useAppDesignConfig } from '~/utils/configuration/design/use-app-design-config.hook';
import { createObjectURLFromFile } from '~/utils/files';

export const useUpdateBrowserIcon = () => {
  const { appMainLogo } = useAppDesignConfig();
  const imgSrc = useMemo(() => createObjectURLFromFile(appMainLogo), [appMainLogo]);

  const favicon = document.getElementById('favicon') as HTMLLinkElement;

  useEffect(() => {
    if (imgSrc) {
      favicon.href = imgSrc;
    }
  }, [appMainLogo, favicon, imgSrc]);
};

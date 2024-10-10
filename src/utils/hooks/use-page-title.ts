import { useEffect } from 'react';

import { useTitleContext } from '~/routing/page-title.context';

export const usePageTitle = (title?: string) => {
  const { setEntityTitle } = useTitleContext();

  useEffect(() => {
    if (title) {
      setEntityTitle(title);
    }
    return () => {
      setEntityTitle('');
    };
  }, [setEntityTitle, title]);
};

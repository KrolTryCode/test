import { resolvePath, useLocation } from '@tanstack/react-router';
import { useMemo } from 'react';

import { NavTreeItemData } from '~/components/tree/nav-tree/nav-tree.type';

export function useNavTreeHrefLUT(data: NavTreeItemData[], baseUrl: string = location.pathname) {
  const { pathname } = useLocation();

  /**
   * Lookup table для быстрого сопоставления ссылок,
   * используемых в навигационном дереве, с id соответствующих TreeItem
   */
  const LUT = useMemo(() => {
    return getHrefIdLUT(data, baseUrl);
  }, [baseUrl, data]);

  const urlMatchedItemId = useMemo(() => LUT[pathname], [LUT, pathname]);

  return { urlMatchedItemId };
}

function getHrefIdLUT(data: NavTreeItemData[], baseUrl: string) {
  let res: Record<string, string> = {};

  data.forEach(({ id, href, children }) => {
    if (href !== undefined) {
      // todo: check
      const resolvedPathname = resolvePath({
        to: href,
        basepath: baseUrl,
        caseSensitive: false,
        base: '',
      });

      res[resolvedPathname] = id;
    }

    if (children) {
      res = { ...res, ...getHrefIdLUT(children, baseUrl) };
    }
  });

  return res;
}

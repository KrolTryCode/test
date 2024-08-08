import { useMemo } from 'react';
import { resolvePath, useLocation } from 'react-router-dom';

import { NavTreeItemData } from '~/components/nav-tree/nav-tree.type';

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
      const resolvedPathname = resolvePath(href, baseUrl).pathname;

      res[resolvedPathname] = id;
    }

    if (children) {
      res = { ...res, ...getHrefIdLUT(children, baseUrl) };
    }
  });

  return res;
}

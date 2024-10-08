import { useMatches } from 'react-router-dom';

import { routes } from '~/routing/routes/routes';

import { SidebarLink } from './submenu.types';

export function useSubMenu(): SidebarLink[] {
  const matches = useMatches();

  const MATCHING_ID_REGEXP = /^\d+-\d+-(\d+)$/;

  const currentTopMenuItem = matches.find(({ id }) => MATCHING_ID_REGEXP.test(id));
  if (!currentTopMenuItem) {
    return [];
  }

  const matchResult = MATCHING_ID_REGEXP.exec(currentTopMenuItem.id);
  const childIndex = matchResult?.[1] ?? null;
  if (childIndex === null) {
    return [];
  }

  const subRoutes =
    routes.find(({ key }) => key === 'main')?.children?.[+childIndex]?.children ?? [];

  return subRoutes
    .filter(({ menuDisplay }) => !!menuDisplay /* && hasAccess */)
    .map(({ menuDisplay, path }) => ({
      path: `${currentTopMenuItem.pathname}/${path}`,
      label: menuDisplay!.label,
    }));
}

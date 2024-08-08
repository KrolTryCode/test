import { useMatches } from 'react-router-dom';

import { useAppSelector } from '~/app/store.hooks';
import { selectUserAuthorities } from '~/app/user/user.store';

export function useRouteAccess(): boolean {
  const matches = useMatches();
  const userAuthorities = useAppSelector(selectUserAuthorities);

  const currentAccessBy = matches.reduceRight<string[] | undefined>(
    (current, match) => (match.data as { accessBy?: string[] })?.accessBy ?? current,
    undefined,
  );

  if (!currentAccessBy) {
    return true;
  }

  for (const userAuthority of userAuthorities) {
    for (const accessBy of currentAccessBy) {
      if (accessBy === userAuthority) {
        return true;
      }
    }
  }

  return false;
}

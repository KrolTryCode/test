import { useMatches } from 'react-router-dom';

import { useUserStore } from '~/app/user/user.store';

export function useRouteAccess(): boolean {
  const matches = useMatches();
  const permissions = useUserStore(store => store.data?.permissions ?? []);

  const currentAccessBy = matches.reduceRight<string[] | undefined>(
    (current, match) => (match.data as { accessBy?: string[] })?.accessBy ?? current,
    undefined,
  );

  if (!currentAccessBy) {
    return true;
  }

  for (const userAuthority of permissions) {
    for (const accessBy of currentAccessBy) {
      if (accessBy === userAuthority) {
        return true;
      }
    }
  }

  return false;
}

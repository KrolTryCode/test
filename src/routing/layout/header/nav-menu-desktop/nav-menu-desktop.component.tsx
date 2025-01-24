import { Divider, Link as MuiLink } from '@mui/material';
import { useRouter } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { useGetExternalLinksQuery } from '~/api/queries/settings/get-external-links.query';
import { useUserStore } from '~/app/user/user.store';
import { FileRoutesById } from '~/routing/routeTree.gen';

import { HeaderNavLink } from './header-nav-link.component';
import { StyledHeaderNav } from './nav-menu-desktop.style';

type MainRouteChildren = Required<FileRoutesById['/_main']>['children'];
type MainRoueChild = MainRouteChildren[keyof MainRouteChildren];

export const NavMenuDesktop = () => {
  const { t } = useTranslation();

  const { data: externalLinks } = useGetExternalLinksQuery({ select: data => data.links });

  const userRoles = useUserStore(state => state.data?.permissions ?? []);
  const router = useRouter();
  const mainRouteChildren = router.routesById['/_main'].children as unknown as MainRoueChild[];

  return (
    <StyledHeaderNav>
      {mainRouteChildren
        .filter(
          r => filterRouteAccessByRoles(r, userRoles) && (r.options.staticData!.order ?? -1) >= 0,
        )
        .toSorted(sortRouteByOrder)
        .map(({ path, id, options }) => (
          <HeaderNavLink to={path} key={id} paddingInline={2}>
            {t(options.staticData!.title!)}
          </HeaderNavLink>
        ))}

      <Divider orientation={'vertical'} hidden={!externalLinks?.length} />

      {externalLinks?.map(link => (
        <MuiLink
          key={link.order}
          href={link.url}
          underline={'hover'}
          target={'_blank'}
          rel={'noopener noreferrer'}
          paddingInline={1}
        >
          {link.name}
        </MuiLink>
      ))}
    </StyledHeaderNav>
  );
};

function filterRouteAccessByRoles(route: MainRoueChild, userRoles: string[]): boolean {
  if (!route.options.staticData?.accessBy) {
    return true;
  }

  return route.options.staticData.accessBy.some(role => userRoles.includes(role));
}

function sortRouteByOrder(a: MainRoueChild, b: MainRoueChild) {
  return Number(a.options.staticData!.order) - Number(b.options.staticData!.order);
}

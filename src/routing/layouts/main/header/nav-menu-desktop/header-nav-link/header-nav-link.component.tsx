import { FC, useEffect, useRef } from 'react';
import { NavLinkProps, useMatches } from 'react-router-dom';

import { StyledHeaderNavLink } from '../nav-menu-desktop.style';

/**
 * @description
 * HeaderNavLink is a wrapper for NavLink component
 *
 * It's used to scroll to the active NavLink
 */
export const HeaderNavLink: FC<NavLinkProps> = ({ children, ...props }) => {
  const { to } = props;

  const matches = useMatches();

  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (ref.current && matches.some(match => match.pathname.includes(to as string))) {
      ref.current.scrollIntoView({ block: 'center' });
    }
  }, [matches, to]);

  return (
    <StyledHeaderNavLink {...props} ref={ref}>
      {children}
    </StyledHeaderNavLink>
  );
};

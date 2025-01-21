import { Box, BoxProps } from '@mui/material';
import { FC, useEffect, useRef } from 'react';
import { NavLink, NavLinkProps, useMatches } from 'react-router-dom';

/**
 * @description
 * HeaderNavLink is a wrapper for NavLink component
 *
 * It's used to scroll to the active NavLink
 */
export const HeaderNavLink: FC<NavLinkProps & BoxProps> = ({ children, ...props }) => {
  const { to } = props;

  const matches = useMatches();

  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (ref.current && matches.some(match => match.pathname.includes(to as string))) {
      ref.current.scrollIntoView({ block: 'center' });
    }
  }, [matches, to]);

  return (
    <Box component={NavLink} sx={{ textDecoration: 'none' }} {...props} ref={ref}>
      {children}
    </Box>
  );
};

import { Box, BoxProps } from '@mui/material';
import { LinkProps, Link, useMatches } from '@tanstack/react-router';
import { FC, useEffect, useRef } from 'react';

/**
 * @description
 * HeaderNavLink is a wrapper for NavLink component
 *
 * It's used to scroll to the active NavLink
 */
export const HeaderNavLink: FC<LinkProps & BoxProps> = ({ children, ...props }) => {
  const { to } = props;

  const matches = useMatches();

  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (ref.current && to && matches.some(route => String(route.fullPath).includes(to))) {
      ref.current.scrollIntoView({ block: 'center' });
    }
  }, [matches, to]);

  return (
    //@ts-expect-error search types
    <Box component={Link} sx={{ textDecoration: 'none' }} {...props} ref={ref}>
      {children}
    </Box>
  );
};

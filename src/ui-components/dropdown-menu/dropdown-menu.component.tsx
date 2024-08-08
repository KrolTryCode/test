import ExpandLessIcon from '@mui/icons-material/ExpandLessRounded';
import ExpandMoreIcon from '@mui/icons-material/ExpandMoreRounded';
import { Menu, Stack } from '@mui/material';
import { FC, Fragment, useState, MouseEvent, useRef } from 'react';

import { Button } from '../button/button.component';

import { DropdownMenuProps } from './dropdown-menu.type';

export type { DropdownMenuProps };

export const DropdownMenu: FC<DropdownMenuProps> = ({
  buttonContent,
  buttonSize = 'small',
  buttonColor = 'primary',
  buttonVariant = 'text',
  showArrow = true,
  closeOnClick = true,
  isLoading = false,
  openInteraction = 'click',
  icon,
  children,
  ...menuProps
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const ExpandIcon = anchorEl ? ExpandLessIcon : ExpandMoreIcon;
  const isOpen = Boolean(anchorEl);
  const timeoutRef = useRef<number | null>(null);

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    if (isOpen && openInteraction === 'click') {
      setAnchorEl(null);
    } else {
      event.stopPropagation();
      setAnchorEl(event.currentTarget);
    }
  };

  const forceClose = () => setAnchorEl(null);

  const handleClose = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      setAnchorEl(null);
    }, 150);
  };

  const handleMenuEnter = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
  };

  return (
    <Fragment>
      <Button
        variant={buttonVariant}
        size={buttonSize}
        color={buttonColor !== 'text.secondary' ? buttonColor : 'primary'}
        onClick={handleOpen}
        icon={icon}
        onMouseEnter={openInteraction === 'hover' ? handleOpen : undefined}
        onMouseLeave={openInteraction === 'hover' ? handleClose : undefined}
        sx={{
          zIndex: theme => (isOpen ? theme.zIndex.modal + 1 : 0),
          ...(buttonColor === 'text.secondary' && {
            color: theme => theme.palette.text.secondary,
          }),
        }}
        aria-haspopup={'true'}
        aria-expanded={!!anchorEl}
        isLoading={isLoading}
      >
        <Stack direction={'row'} alignItems={'center'} gap={1}>
          {buttonContent && <Stack alignItems={'center'}>{buttonContent}</Stack>}
          {showArrow && (
            <ExpandIcon stroke={'currentColor'} strokeWidth={'0.3'} sx={{ fontSize: '1.5em' }} />
          )}
        </Stack>
      </Button>
      <Menu
        {...menuProps}
        sx={{
          ...(!!menuProps.sx && menuProps.sx),
          zIndex: theme => (isOpen ? theme.zIndex.modal + 2 : 0),
        }}
        open={isOpen}
        anchorEl={anchorEl}
        onClose={forceClose}
        onClick={closeOnClick ? forceClose : undefined}
        MenuListProps={{
          onMouseLeave: openInteraction === 'hover' ? forceClose : undefined,
          onMouseEnter: handleMenuEnter,
        }}
      >
        {children}
      </Menu>
    </Fragment>
  );
};

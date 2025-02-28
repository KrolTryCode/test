import { Grow, Paper, Popper, PopperProps, Skeleton } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

interface PopperWithPaperProps extends PropsWithChildren, Omit<PopperProps, 'open' | 'children'> {
  anchorEl?: HTMLElement;
  isOpen: boolean;
  isContentLoading?: boolean;
  disablePortal?: boolean;
}

export const PopperWithPaper: FC<PopperWithPaperProps> = ({
  children,
  isOpen,
  isContentLoading,
  anchorEl,
  ...props
}) => (
  <Popper
    {...props}
    open={isOpen}
    anchorEl={anchorEl}
    transition
    sx={({ zIndex }) => ({ zIndex: zIndex.tooltip + 1 })}
  >
    {({ TransitionProps }) => (
      <Grow
        {...TransitionProps}
        timeout={{ appear: 200, enter: 200, exit: 150 }}
        style={{ transformOrigin: 'top center' }}
      >
        <Paper
          sx={({ spacing }) => ({
            minWidth: anchorEl?.getClientRects()[0].width,
            margin: spacing(1),
            maxHeight: '70vh',
            overflowY: 'auto',
            scrollbarWidth: 'thin',
          })}
        >
          {isContentLoading ? (
            <Skeleton
              variant={'rounded'}
              animation={'wave'}
              height={145}
              sx={{ marginInline: '8px' }}
            />
          ) : (
            children
          )}
        </Paper>
      </Grow>
    )}
  </Popper>
);

import { Grow, Paper, Popper, Skeleton } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

interface PopperWithPaperProps extends PropsWithChildren {
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
  disablePortal = true,
}) => (
  <Popper
    open={isOpen}
    anchorEl={anchorEl}
    transition
    disablePortal={disablePortal}
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
            width: anchorEl?.getClientRects()[0].width,
            paddingBlock: spacing(1),
            maxHeight: '500px',
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

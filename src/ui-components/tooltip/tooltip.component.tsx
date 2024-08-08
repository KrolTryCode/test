import { styled } from '@mui/material';
import MuiTooltip, { TooltipProps as MuiTooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { ReactElement, ReactNode } from 'react';

interface TooltipProps {
  content: ReactNode;
  children: ReactElement;
  variant?: 'light' | 'dark' | 'error';
  hasElevation?: boolean;
  hasArrow?: boolean;
  hasOffset?: boolean;
  placement?: MuiTooltipProps['placement'];
  PopperProps?: MuiTooltipProps['PopperProps'];
  className?: string;
  followCursor?: boolean;
}

export const Tooltip = styled(
  ({
    className,
    followCursor,
    content,
    hasArrow,
    children,
    placement,
    PopperProps,
  }: TooltipProps) => (
    <MuiTooltip
      classes={{ popper: className }}
      title={content}
      arrow={hasArrow}
      placement={placement}
      PopperProps={PopperProps}
      followCursor={followCursor}
    >
      {children}
    </MuiTooltip>
  ),
)(({ theme, variant = 'light', hasElevation = false, hasOffset = true }) => {
  return {
    [`& .${tooltipClasses.tooltip}`]: {
      ...(variant === 'light' && {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.text.primary,
      }),
      ...(variant === 'error' && {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.error.contrastText,
      }),
      ...(hasElevation && {
        boxShadow: theme.shadows[3],
      }),
    },
    [`& .${tooltipClasses.arrow}::before`]: {
      ...(variant === 'light' && {
        color: theme.palette.common.white,
      }),
      ...(variant === 'error' && {
        color: theme.palette.error.main,
      }),
      ...(hasElevation && {
        boxShadow: theme.shadows[1],
      }),
    },
    [`& .${tooltipClasses.tooltipPlacementBottom}`]: {
      ...(!hasOffset && {
        margin: '0 !important',
      }),
    },
    [`& .${tooltipClasses.tooltipPlacementTop}`]: {
      ...(!hasOffset && {
        margin: '0 !important',
      }),
    },
  };
});

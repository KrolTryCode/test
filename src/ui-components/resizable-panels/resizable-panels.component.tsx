import { styled } from '@mui/material';
import { PanelGroup as ResizablePanelGroup, PanelResizeHandle } from 'react-resizable-panels';

export { Panel } from 'react-resizable-panels';

export const PanelGroup = styled(ResizablePanelGroup)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  height: '100%',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
}));

export const PanelResizer = styled(PanelResizeHandle)(({ theme }) => ({
  width: '3px',
  background: `${theme.palette.text.primary}60`,
}));

export const TransparentPanelResizer = styled(PanelResizeHandle)(() => ({
  width: '2px',
  height: '95%',
  background: 'transparent',
}));

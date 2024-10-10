import { Paper } from '@mui/material';
import { FC, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { useGridStore, closeFullscreen } from '../datagrid.store';

interface GridFullscreenProps {
  children: JSX.Element /* Grid */;
  hasFullscreenMode: boolean;
  gridId?: string;
}

export const GridFullscreen: FC<GridFullscreenProps> = ({
  children,
  hasFullscreenMode,
  gridId = 'main',
}) => {
  const isInFs = useGridStore(state => state.fullsreenedGridId === gridId);

  useEffect(() => {
    return () => {
      if (isInFs) {
        if (document.fullscreenElement) {
          void document.exitFullscreen();
        }
        closeFullscreen();
      }
    };
  }, [isInFs]);

  if (hasFullscreenMode && isInFs) {
    return createPortal(
      <Paper
        sx={{ position: 'fixed', top: 0, height: '100vh', left: 0, width: '100vw', zIndex: 2 }}
      >
        {children}
      </Paper>,
      document.body,
    );
  }

  return children;
};

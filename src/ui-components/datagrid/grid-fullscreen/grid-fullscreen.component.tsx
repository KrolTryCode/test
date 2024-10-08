import { Paper } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface GridFullscreenProps {
  children: JSX.Element;
  hasFullscreenMode: boolean;
}

export const GridFullscreen: FC<GridFullscreenProps> = ({ children, hasFullscreenMode }) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (document.fullscreenEnabled) {
      const onFullscreenChanged = () => setEnabled(!!document.fullscreenElement);

      document.addEventListener('fullscreenchange', onFullscreenChanged);
      return () => {
        if (document.fullscreenElement) {
          void document.exitFullscreen();
        }
        document.removeEventListener('fullscreenchange', onFullscreenChanged);
      };
    }
  }, []);

  if (hasFullscreenMode && document.fullscreenEnabled && enabled) {
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

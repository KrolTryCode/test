import FullscreenRoundedIcon from '@mui/icons-material/FullscreenRounded';
import { FC, useEffect } from 'react';

import { Button } from '../button/button.component';
import { ButtonProps } from '../button/button.type';

type FullscreenButtonProps = Omit<ButtonProps, 'onChange'> & {
  element: HTMLElement | null;
  onChange?: (enabled: boolean) => void;
};

export const FullscreenButton: FC<FullscreenButtonProps> = ({
  element,
  onChange,
  ...props
}: FullscreenButtonProps) => {
  useEffect(() => {
    const onFullscreenChanged = () => {
      if (!document.fullscreenElement) {
        onChange?.(false);
      }
    };

    window.addEventListener('fullscreenchange', onFullscreenChanged);
    return () => {
      window.removeEventListener('fullscreenchange', onFullscreenChanged);
    };
  }, [onChange]);

  if (!document.fullscreenEnabled) {
    console.error('Fullscreen mode is not supported on this device or browser');
    return null;
  }

  const toggleFullscreen = async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await element?.requestFullscreen();
    }
    onChange?.(!!document.fullscreenElement);
  };

  return (
    <Button variant={'text'} color={'primary'} {...props} onClick={toggleFullscreen}>
      <FullscreenRoundedIcon />
    </Button>
  );
};

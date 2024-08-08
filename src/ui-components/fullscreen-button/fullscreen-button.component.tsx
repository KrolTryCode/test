import FullscreenRoundedIcon from '@mui/icons-material/FullscreenRounded';
import { FC } from 'react';

import { Button } from '../button/button.component';
import { ButtonProps } from '../button/button.type';

type FullscreenButtonProps = ButtonProps & {
  element: HTMLElement | null;
};

export const FullscreenButton: FC<FullscreenButtonProps> = ({
  element,
  ...props
}: FullscreenButtonProps) => {
  const toggleFullscreen = async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await element?.requestFullscreen();
    }
  };

  return (
    <Button variant={'text'} color={'primary'} {...props} onClick={toggleFullscreen}>
      <FullscreenRoundedIcon />
    </Button>
  );
};

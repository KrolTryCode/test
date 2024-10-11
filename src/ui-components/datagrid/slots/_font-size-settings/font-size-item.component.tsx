import RestartIcon from '@mui/icons-material/RestartAlt';
import TextDecreaseIcon from '@mui/icons-material/TextDecreaseRounded';
import TextIncreaseIcon from '@mui/icons-material/TextIncreaseRounded';
import { ButtonGroup, Box, Typography } from '@mui/material';
import { Button } from '@pspod/ui-components';
import { FC, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DEFAULT_FONT_SIZE, MAX_FONT_SIZE, STEP } from './font-size-settings.consts';

interface FontSizeItemProps {
  label: string;
  showDrop?: boolean;
  applyFontSize: (fs: number) => void;
  gridElement: HTMLDivElement | null;
}

export const FontSizeItem: FC<FontSizeItemProps> = ({
  label,
  showDrop = true,
  gridElement,
  applyFontSize,
}) => {
  const { t } = useTranslation();
  const [fs, setFs] = useState(() =>
    gridElement
      ? +(getComputedStyle(gridElement)?.fontSize?.replace('px', '') ?? DEFAULT_FONT_SIZE)
      : DEFAULT_FONT_SIZE,
  );

  const changeFontSize = useCallback(
    (fs: number) => {
      const newFs = Math.min(Math.max(fs, DEFAULT_FONT_SIZE), MAX_FONT_SIZE);
      applyFontSize(newFs);
      setFs(newFs);
    },
    [applyFontSize],
  );
  const decreaseFontSize = () => changeFontSize(fs - STEP);
  const increaseFontSize = () => changeFontSize(fs + STEP);
  const dropFontSize = () => changeFontSize(DEFAULT_FONT_SIZE);

  return (
    <Box paddingInline={1} paddingBlock={1} borderBottom={'1px solid'} borderColor={'divider'}>
      <Typography paddingInline={1} letterSpacing={0} textAlign={'center'}>
        {label}
      </Typography>
      <ButtonGroup>
        <Button
          variant={'text'}
          color={'primary'}
          onClick={decreaseFontSize}
          disabled={fs === DEFAULT_FONT_SIZE}
          icon={<TextDecreaseIcon />}
          title={t('ACTION.DECREASE')}
        />
        <Button variant={'text'} disabled>
          {fs}px
        </Button>
        <Button
          variant={'text'}
          color={'primary'}
          onClick={increaseFontSize}
          disabled={fs === MAX_FONT_SIZE}
          icon={<TextIncreaseIcon />}
          title={t('ACTION.INCREASE')}
        />
        {showDrop && (
          <Button
            variant={'text'}
            color={'primary'}
            onClick={dropFontSize}
            disabled={fs === DEFAULT_FONT_SIZE}
            icon={<RestartIcon />}
            title={t('ACTION.DROP')}
          />
        )}
      </ButtonGroup>
    </Box>
  );
};

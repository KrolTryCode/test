import { Backdrop, Stack, Typography, styled } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

const StyledBackdrop = styled(Backdrop)(() => ({
  backgroundColor: '#ffffff38',
  position: 'absolute',
  userSelect: 'none',

  '& .MuiTypography-root': {
    padding: '4px 8px',
    backgroundColor: '#ffffff',
  },
}));

interface PreloaderProps {
  visible?: boolean;
}

export const Preloader: FC<PreloaderProps> = ({ visible = true }) => {
  const { t } = useTranslation();
  return (
    <StyledBackdrop open={visible}>
      <Stack paddingBlock={3} paddingInline={10} gap={2} alignItems={'center'}>
        <CircularProgress />
        <Typography fontSize={'16px'} fontWeight={'500'}>
          {t('STATUS.LOADING')}
        </Typography>
      </Stack>
    </StyledBackdrop>
  );
};

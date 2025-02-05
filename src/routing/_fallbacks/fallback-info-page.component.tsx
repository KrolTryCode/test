import { Box, Typography } from '@mui/material';
import { Button, Image } from '@pspod/ui-components';
import { useNavigate } from '@tanstack/react-router';
import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { logo } from '~/utils/configuration/logo';

import { ButtonNavigate, FallbackPageProps } from './fallback.type';

const FallbackInfoPage: FC<FallbackPageProps> = ({
  pageType,
  buttonNavigate,
  showButton = true,
  showLogo = true,
  createNodeAction,
  logoKey,
}) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    buttonNavigate === ButtonNavigate.Back
      ? void navigate({ to: '..' })
      : buttonNavigate === ButtonNavigate.CreateNode
        ? createNodeAction?.()
        : void navigate({ to: '/projects' });
  }, [buttonNavigate, navigate, createNodeAction]);

  return (
    <Box
      padding={4}
      display={'flex'}
      margin={'auto'}
      textAlign={'center'}
      justifyContent={'center'}
    >
      <Box>
        {showLogo && (
          <Box height={'300px'}>
            <Image src={logo[logoKey ?? i18n.language]} alt={t('PROJECT_NAME')} />
          </Box>
        )}
        <Typography margin={'30px auto 0'} fontSize={24}>
          {t(`ERROR.${pageType}.TEXT1`)}
        </Typography>
        <Typography margin={'16px auto 0'} fontSize={20}>
          {t(`ERROR.${pageType}.TEXT2`)}
        </Typography>
        {showButton && (
          <Button fullWidth onClick={handleClick} variant={'outlined'} color={'primary'}>
            {t(`ACTION.${buttonNavigate}`)}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export { FallbackInfoPage };

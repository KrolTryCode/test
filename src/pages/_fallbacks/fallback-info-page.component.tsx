import { Box, Typography } from '@mui/material';
import { Button, Image } from '@pspod/ui-components';
import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { ButtonNavigate, FallbackPageProps } from '~/pages/_fallbacks/fallback.types';
import { logo } from '~/utils/configuration/logo';
import { homePath } from '~/utils/configuration/routes-paths';

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
    buttonNavigate === ButtonNavigate.Back
      ? navigate(-1)
      : buttonNavigate === ButtonNavigate.CreateNode
        ? createNodeAction?.()
        : navigate(homePath);
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
          <Button fullWidth onClick={handleClick}>
            {t(`ACTION.${buttonNavigate}`)}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export { FallbackInfoPage };

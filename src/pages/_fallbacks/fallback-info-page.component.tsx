import { Box, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { ButtonNavigate, FallbackPageProps } from '~/pages/_fallbacks/fallback.types';
import { Button } from '~/ui-components/button/button.component';
import { Image } from '~/ui-components/carousel/image/image.component';
import { logo } from '~/utils/configuration/logo';
import { homePath } from '~/utils/configuration/routes-paths';

const FallbackInfoPage: FC<FallbackPageProps> = ({
  pageType,
  buttonNavigate,
  showButton = true,
  showLogo = true,
}) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

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
            <Image src={logo[i18n.language]} alt={t('PROJECT_NAME')} />
          </Box>
        )}
        <Typography margin={'30px auto 0'} fontSize={24}>
          {t(`ERROR.${pageType}.TEXT1`)}
        </Typography>
        <Typography margin={'16px auto 0'} fontSize={20}>
          {t(`ERROR.${pageType}.TEXT2`)}
        </Typography>
        {showButton && (
          <Button
            fullWidth
            onClick={() =>
              buttonNavigate === ButtonNavigate.Back ? navigate(-1) : navigate(homePath)
            }
          >
            {t(`BUTTON.${buttonNavigate}`)}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export { FallbackInfoPage };

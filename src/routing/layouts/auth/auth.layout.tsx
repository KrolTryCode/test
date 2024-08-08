import { Box } from '@mui/material';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';

import { logo } from '~/utils/configuration/logo';

import styles from './auth.module.scss';

export const AuthLayout = () => {
  const { t, i18n } = useTranslation();

  return (
    <Box
      height={'100dvh'}
      width={'100%'}
      className={cn('with-footer', styles.auth)}
      display={'flex'}
    >
      <Box className={styles.auth_content} margin={'auto'}>
        <div className={styles.auth_content__header}>
          <img src={logo[i18n.language]} alt={t('PROJECT_NAME')} />
        </div>
        <Outlet />
      </Box>
    </Box>
  );
};

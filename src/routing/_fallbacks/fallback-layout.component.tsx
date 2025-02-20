import { Stack, Typography } from '@mui/material';
import { Avatar } from '@pspod/ui-components';
import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { getDesignLogoQueryOptions } from '~/api/queries/design/get-design-logo.query';
import { ButtonLink } from '~/components/implicit-links';
import { logo } from '~/utils/configuration/design/logo';
import { createObjectURLFromFile } from '~/utils/files';

export enum FallbackPageType {
  WorkInProgress = 'WORK_IN_PROGRESS',
  NotFoundPage = 'NOT_FOUND_PAGE',
  Forbidden = 'FORBIDDEN',
}

const FallbackLayout: FC<{ pageType: FallbackPageType }> = ({ pageType }) => {
  const { t, i18n } = useTranslation();

  const { data: logoSrc } = useQuery(
    getDesignLogoQueryOptions('loginLogo', { select: createObjectURLFromFile }),
  );

  return (
    <Stack gap={1} padding={4} margin={'auto'} textAlign={'center'} justifyContent={'center'}>
      <Avatar
        size={300}
        variant={'square'}
        color={'secondary'}
        fit={'contain'}
        src={logoSrc ?? logo[i18n.language]}
        alt={t('PROJECT_NAME')}
      />
      <Typography variant={'subtitle1'} gutterBottom={false}>
        {t(`ERROR.${pageType}.TEXT1`)}
      </Typography>
      <Typography variant={'subtitle2'}>{t(`ERROR.${pageType}.TEXT2`)}</Typography>
      <ButtonLink to={'/projects'} fullWidth variant={'outlined'} color={'primary'}>
        {t('ACTION.TO_MAIN')}
      </ButtonLink>
    </Stack>
  );
};

export { FallbackLayout };

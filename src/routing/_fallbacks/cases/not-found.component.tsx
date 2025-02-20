import SearchOffIcon from '@mui/icons-material/SearchOff';
import { Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { ButtonLink } from '~/components/implicit-links';

import { FallbackLayout, FallbackPageType } from '../fallback-layout.component';

export const NotFoundPage: FC = () => {
  return <FallbackLayout pageType={FallbackPageType.NotFoundPage} />;
};

export const NotFoundEntity: FC<{ message: string }> = ({ message }) => {
  const { t } = useTranslation();

  return (
    <Stack height={'100%'} alignItems={'center'} justifyContent={'center'} gap={1}>
      <SearchOffIcon fontSize={'large'} />
      <Typography variant={'subtitle2'}>{message}</Typography>
      <Stack direction={'row'} gap={1} width={'100%'} maxWidth={'300px'}>
        <ButtonLink fullWidth color={'primary'} to={'..'}>
          {t('ACTION.BACK')}
        </ButtonLink>
        <ButtonLink fullWidth color={'primary'} to={'/projects'}>
          {t('ACTION.TO_MAIN')}
        </ButtonLink>
      </Stack>
    </Stack>
  );
};

import { Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { useUserStore } from '~/app/user/user.store';
import { Avatar } from '~/ui-components/avatar/avatar.component';
import { DropdownMenu } from '~/ui-components/dropdown-menu/dropdown-menu.component';
import { profilePath } from '~/utils/configuration/routes-paths';
import { useAuthenticate } from '~/utils/use-authenticate.hook';

import { StyledMenuItem } from './user-menu.style';

export const UserMenu: FC = () => {
  const user = useUserStore(store => store.data?.user);
  const { t } = useTranslation();
  const { onLogout } = useAuthenticate();

  return (
    <DropdownMenu
      buttonSize={'medium'}
      buttonColor={'text.secondary'}
      buttonContent={<Avatar size={'small'} withIcon color={'secondary'} />}
    >
      {/* @ts-expect-error TODO: fix styled type */}
      <StyledMenuItem divider component={Link} to={profilePath}>
        <Stack color={'text.primary'} whiteSpace={'normal'}>
          {user?.firstName} {user?.lastName}
          <Typography fontSize={'12px'} fontWeight={'light'}>
            {user?.email}
          </Typography>
        </Stack>
      </StyledMenuItem>
      <StyledMenuItem divider onClick={onLogout}>
        {t('AUTH.LOGOUT')}
      </StyledMenuItem>
    </DropdownMenu>
  );
};

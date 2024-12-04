import { Stack, Typography } from '@mui/material';
import { DropdownMenu } from '@pspod/ui-components';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { useUserStore } from '~/app/user/user.store';
import { UserAvatar } from '~/components/user-avatar/user-avatar.component';
import { profilePath } from '~/utils/configuration/routes-paths';
import { useAuthenticate } from '~/utils/hooks/use-authenticate';

import { StyledMenuItem } from './user-menu.style';

export const UserMenu: FC = () => {
  const user = useUserStore(store => store.data?.user);
  const { t } = useTranslation();
  const { onLogout } = useAuthenticate();

  return (
    <DropdownMenu
      buttonSize={'medium'}
      buttonColor={'text.secondary'}
      buttonContent={
        user?.id ? (
          <UserAvatar
            userId={user.id}
            firstName={user.firstName}
            lastName={user.lastName}
            surName={user.surName}
            color={'secondary'}
          />
        ) : undefined
      }
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

import { ArrowBack } from '@mui/icons-material';
import { Button } from '@pspod/ui-components';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import { UserAvatar } from '~/components/user-avatar/user-avatar.component';
import { ProfileForm } from '~/components/user-profile/user-profile-form/profile-form.component';
import {
  UserProfileContent,
  UserProfileHeader,
  UserProfileLayout,
} from '~/components/user-profile/user-profile.style';
import { adminPath, usersPath } from '~/utils/configuration/routes-paths';
import { usePageTitle } from '~/utils/hooks/use-page-title';

import { useUserAccount } from './user-account.hook';

const UserAccount: FC = () => {
  const { user, isUserLoading, handleChangePassword, handleUpdateUser } = useUserAccount();

  usePageTitle(user.fullName);

  return (
    <UserProfileLayout>
      <UserProfileHeader userName={user.fullName}>
        <Button
          component={Link}
          variant={'text'}
          to={`/${adminPath}/${usersPath}`}
          icon={<ArrowBack />}
        />
      </UserProfileHeader>
      <UserProfileContent>
        <UserAvatar
          size={'large'}
          userId={user.id ?? ''}
          firstName={user?.firstName}
          lastName={user?.lastName}
          surName={user?.surName}
        />
        <ProfileForm
          data={user}
          isLoading={isUserLoading}
          handleUpdateUser={handleUpdateUser}
          isCurrent={false}
          handleChangeAccountPassword={handleChangePassword}
        />
      </UserProfileContent>
    </UserProfileLayout>
  );
};

export default UserAccount;

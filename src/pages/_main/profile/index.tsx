import { createFileRoute } from '@tanstack/react-router';

import { ProfileForm } from '~/components/user-profile/user-profile-form/profile-form.component';
import {
  UserProfileContent,
  UserProfileHeader,
  UserProfileLayout,
} from '~/components/user-profile/user-profile.style';

import { ProfileAvatar } from './profile-avatar/profile-avatar.component';
import { useProfile } from './profile.hook';

export const Route = createFileRoute('/_main/profile/')({
  component: Profile,
  staticData: {
    title: 'USER.LABEL',
  },
});

export function Profile() {
  const { user, isUserLoading, handleChangePassword, handleUpdateUser } = useProfile();

  return (
    <UserProfileLayout>
      <UserProfileHeader userName={user.fullName} />
      <UserProfileContent>
        <ProfileAvatar
          userId={user.id ?? ''}
          firstName={user?.firstName}
          lastName={user?.lastName}
          surName={user?.surName}
        />
        <ProfileForm
          data={user}
          isLoading={isUserLoading}
          handleUpdateUser={handleUpdateUser}
          isCurrent
          handleChangePassword={handleChangePassword}
        />
      </UserProfileContent>
    </UserProfileLayout>
  );
}

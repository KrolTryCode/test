import { createFileRoute } from '@tanstack/react-router';

import { ProfileForm } from '~/components/forms/profile/profile-form';
import { ProfileAvatar } from '~/components/user-avatar/editable-user-avatar.component';
import {
  UserProfileContent,
  UserProfileHeader,
  UserProfileLayout,
} from '~/components/user-profile/user-profile.style';
import { useProfile } from '~/use-cases/profile.hook';

export const Route = createFileRoute('/_main/profile')({
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

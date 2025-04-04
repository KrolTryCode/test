import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { getCurrentUserQueryOptions } from '~/api/queries/users/get-current-user.query';
import { ProfileForm } from '~/components/forms/profile/profile-form';
import { ProfileAvatar } from '~/components/user-avatar/editable-user-avatar.component';
import {
  UserProfileContent,
  UserProfileHeader,
  UserProfileLayout,
} from '~/components/user-profile/user-profile.style';
import { getFullName } from '~/components/user-profile/user-profile.utils';
import { useProfile } from '~/use-cases/profile.hook';

export const Route = createFileRoute('/_main/profile')({
  component: Profile,
  staticData: {
    title: 'USER.LABEL',
  },
  loader: async ({ context }) => {
    const user = await context.queryClient.fetchQuery(getCurrentUserQueryOptions());
    const fullName = getFullName(user.user?.firstName, user.user?.lastName, user.user?.surName);
    context.title = fullName;
  },
});

export function Profile() {
  const {
    data: { user },
  } = useSuspenseQuery(getCurrentUserQueryOptions());

  const { handleChangePassword, handleUpdateUser } = useProfile(user ?? {});
  const fullName = getFullName(user?.firstName, user?.lastName, user?.surName);

  return (
    <UserProfileLayout>
      <UserProfileHeader userName={fullName} />
      <UserProfileContent>
        <ProfileAvatar
          userId={user?.id ?? ''}
          firstName={user?.firstName}
          lastName={user?.lastName}
          surName={user?.surName}
        />
        <ProfileForm
          data={user}
          handleUpdateUser={handleUpdateUser}
          isCurrent
          handleChangePassword={handleChangePassword}
        />
      </UserProfileContent>
    </UserProfileLayout>
  );
}

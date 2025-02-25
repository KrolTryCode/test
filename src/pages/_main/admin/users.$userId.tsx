import { ArrowBack } from '@mui/icons-material';
import { createFileRoute } from '@tanstack/react-router';

import { getUserQueryOptions } from '~/api/queries/users/get-user.query';
import { ProfileForm } from '~/components/forms/profile/profile-form';
import { ButtonLink } from '~/components/implicit-links';
import { UserAvatar } from '~/components/user-avatar/user-avatar.component';
import {
  UserProfileContent,
  UserProfileHeader,
  UserProfileLayout,
} from '~/components/user-profile/user-profile.style';
import { getFullName } from '~/components/user-profile/user-profile.utils';
import { useUserAccount } from '~/use-cases/user-account.hook';

export const Route = createFileRoute('/_main/admin/users/$userId')({
  component: UserAccount,
  staticData: {
    title: 'ENTITY.USER',
  },
  loader: async ({ context, params: { userId } }) => {
    const user = await context.queryClient.fetchQuery(getUserQueryOptions(userId));
    const fullName = getFullName(user?.firstName, user?.lastName, user?.surName);
    context.title = fullName;
    return { user: { ...user, fullName } };
  },
});

function UserAccount() {
  const { userId } = Route.useParams();
  const { user } = Route.useLoaderData();
  const { handleChangePassword, handleUpdateUser } = useUserAccount(userId, user.email);

  return (
    <UserProfileLayout>
      <UserProfileHeader userName={user.fullName}>
        <ButtonLink variant={'text'} to={'/admin/users'} icon={<ArrowBack />} />
      </UserProfileHeader>
      <UserProfileContent>
        <UserAvatar
          size={150}
          userId={user.id ?? ''}
          firstName={user?.firstName}
          lastName={user?.lastName}
          surName={user?.surName}
        />
        <ProfileForm
          data={user}
          handleUpdateUser={handleUpdateUser}
          isCurrent={false}
          handleChangeAccountPassword={handleChangePassword}
        />
      </UserProfileContent>
    </UserProfileLayout>
  );
}

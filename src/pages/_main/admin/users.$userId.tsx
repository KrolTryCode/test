import { ArrowBack } from '@mui/icons-material';
import { createFileRoute } from '@tanstack/react-router';

import { ProfileForm } from '~/components/forms/profile/profile-form';
import { ButtonLink } from '~/components/implicit-links';
import { UserAvatar } from '~/components/user-avatar/user-avatar.component';
import {
  UserProfileContent,
  UserProfileHeader,
  UserProfileLayout,
} from '~/components/user-profile/user-profile.style';
import { useUserAccount } from '~/use-cases/user-account.hook';
import { usePageTitle } from '~/utils/hooks';

export const Route = createFileRoute('/_main/admin/users/$userId')({
  // loader: ({ params }) => fetchPost(params.userId),
  component: UserAccount,
  staticData: {
    title: 'ENTITY.USER',
  },
});

function UserAccount() {
  const { userId } = Route.useParams();
  const { user, isUserLoading, handleChangePassword, handleUpdateUser } = useUserAccount(userId);

  usePageTitle(user.fullName);

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
          isLoading={isUserLoading}
          handleUpdateUser={handleUpdateUser}
          isCurrent={false}
          handleChangeAccountPassword={handleChangePassword}
        />
      </UserProfileContent>
    </UserProfileLayout>
  );
}

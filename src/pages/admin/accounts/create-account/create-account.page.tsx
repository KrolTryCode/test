import { useNavigate } from 'react-router-dom';

import { CreateAccountForm } from '~/pages/admin/accounts/create-account/create-account-form.component';
import { loginPath } from '~/utils/configuration/routes-paths';

const CreateAccountPage = () => {
  const navigate = useNavigate();

  return (
    <CreateAccountForm
      selfRegistration
      onReject={() => navigate(`/${loginPath}`)}
      onResolve={() => navigate(`/${loginPath}`)}
    />
  );
};

export default CreateAccountPage;

import { useMutation } from '@tanstack/react-query';

import { RecoverPasswordRequest } from '~/api/utils/api-requests';

import { UseCustomMutationOptions } from '../../typings/react-query-helpers';
import { ApiClient } from '../../utils/api-client';

export const useCompleteAccountRecoveryMutation = (
  options?: UseCustomMutationOptions<void, Error, RecoverPasswordRequest>,
) =>
  useMutation<void, Error, RecoverPasswordRequest>({
    mutationFn: data => ApiClient.authController.completeRecovery(data),
    ...options,
  });

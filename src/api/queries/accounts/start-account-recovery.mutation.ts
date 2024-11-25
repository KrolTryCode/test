import { useMutation } from '@tanstack/react-query';

import { StartRecoveryRequest } from '~/api/utils/api-requests';

import { UseCustomMutationOptions } from '../../typings/react-query-helpers';
import { ApiClient } from '../../utils/api-client';

export const useStartAccountRecoveryMutation = (
  options?: UseCustomMutationOptions<void, unknown, StartRecoveryRequest>,
) =>
  useMutation<void, unknown, StartRecoveryRequest>({
    mutationFn: data => ApiClient.authController.startRecovery(data),
    ...options,
  });

import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured, ErrorResponse } from '~/api/utils/api-client';
import { UserRegistrationEntity } from '~/api/utils/api-requests';

export const useDeclineAccountMutation = (
  options?: UseCustomMutationOptions<UserRegistrationEntity, AxiosError<ErrorResponse>, string>,
) => {
  return useMutation<UserRegistrationEntity, AxiosError<ErrorResponse>, string>({
    mutationKey: ['accounts', 'decline'],
    mutationFn: async userId =>
      await ApiClientSecured.userRegistrationV1Controller.declineUserRegistration(userId),
    ...options,
  });
};

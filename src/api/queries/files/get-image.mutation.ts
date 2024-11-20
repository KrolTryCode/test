// TODO: вернуть после обновления API

// import { useMutation } from '@tanstack/react-query';
//
// import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
// import { ApiClientSecured } from '~/api/utils/api-client';

// export const useGetImageMutation = (
//   options?: UseCustomMutationOptions<string, unknown, string>,
// ) => {
//   return useMutation<string, unknown, string>({
//     mutationFn: async imageId => {
//       return (await ApiClientSecured.filesV1Controller.getImage(imageId)) as string;
//     },
//     ...options,
//   });
// };

import { notifyError, notifySuccess } from '@pspod/ui-components';
import { isValid } from 'date-fns';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useAddProjectMemberMutation } from '~/api/queries/project-members/add-project-member.mutation';
import { useArchiveProjectMemberMutation } from '~/api/queries/project-members/archive-project-member.mutation';
import { useGetProjectMembersQuery } from '~/api/queries/project-members/get-project-members.query';
import { useUpdateProjectMemberMutation } from '~/api/queries/project-members/update-project-member.mutation';
import { useGetAllRolesQuery } from '~/api/queries/roles/get-all-roles.query';
import { FullProjectNodeMemberInfo } from '~/api/utils/api-requests';
import { addParticipantModal } from '~/components/forms/participant/participant-form';
import { IAddParticipantForm } from '~/components/forms/participant/participant-form.schema';
import { useDeclinatedTranslationsContext } from '~/utils/configuration/translations/declinated-translations-provider';
import { dateTimeToISOString } from '~/utils/date/formatters';
import { validateMinDate } from '~/utils/date/validate-min-date';
import { showErrorMessage } from '~/utils/show-error-message';

export const useParticipants = (nodeId: string) => {
  const { t } = useTranslation();
  const declinatedTranslations = useDeclinatedTranslationsContext();

  const { data: roles = [], isLoading: isRoleListLoading } = useGetAllRolesQuery();

  const { data: participants = [], isLoading: isParticipantListLoading } =
    useGetProjectMembersQuery(nodeId, { enabled: !!nodeId });

  const { mutateAsync: addParticipant } = useAddProjectMemberMutation(nodeId);

  const { mutate: deleteParticipant } = useArchiveProjectMemberMutation(nodeId, {
    onSuccess: () => notifySuccess(t('MESSAGE.PARTICIPANT_DELETION_SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.PARTICIPANT_DELETION_FAILED'),
  });

  const { mutateAsync: updateParticipant } = useUpdateProjectMemberMutation(nodeId);

  const onAddParticipantClick = useCallback(() => {
    const onSave = async (data: IAddParticipantForm) => {
      const expTime =
        data.expirationTime && isValid(data.expirationTime)
          ? dateTimeToISOString(data.expirationTime)
          : '';

      const promises = data.usersId.map(userId =>
        addParticipant({
          roleId: data.roleId,
          expirationTime: expTime,
          userId,
        }),
      );

      try {
        await Promise.all(promises);
        notifySuccess(t('MESSAGE.PARTICIPANT_CREATION_SUCCESS'));
      } catch (e) {
        showErrorMessage(e, t('ERROR.PARTICIPANT_CREATION_FAILED'));
      }
    };

    addParticipantModal({
      title: t('ACTION.ADD', { type: declinatedTranslations.PARTICIPANT.GENITIVE.toLowerCase() }),
      alreadyParticipantsId: participants.map(v => v.userId),
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSave: onSave,
    });
  }, [t, declinatedTranslations.PARTICIPANT.GENITIVE, participants, addParticipant]);

  const onUpdateParticipant = useCallback(
    async (
      { roleId, expirationTime, userId }: FullProjectNodeMemberInfo,
      oldRow: FullProjectNodeMemberInfo,
    ) => {
      const isStringValuesChanged =
        roleId !== oldRow.roleId || expirationTime !== oldRow.expirationTime;
      if (!isStringValuesChanged) {
        return oldRow;
      }

      const isValidExpTime = expirationTime && isValid(expirationTime);

      if (isValidExpTime) {
        const error = validateMinDate(new Date(expirationTime));
        if (error) {
          notifyError(error);
          return oldRow;
        }
      }

      try {
        const result = await updateParticipant({
          userId,
          roleId,
          expirationTime,
        });
        notifySuccess(t('MESSAGE.UPDATE_SUCCESS'));
        return { ...oldRow, result };
      } catch (e) {
        showErrorMessage(e, 'ERROR.UPDATE_FAILED');
        return oldRow;
      }
    },
    [t, updateParticipant],
  );

  return {
    roles,
    participants,
    isDataLoading: isParticipantListLoading || isRoleListLoading,
    onAddParticipantClick,
    onUpdateParticipant,
    deleteParticipant,
  };
};

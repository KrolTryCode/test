import { notifySuccess } from '@pspod/ui-components';
import { isValid } from 'date-fns';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Case, Gender } from 'russian-nouns-js';

import { useAddProjectMemberMutation } from '~/api/queries/project-members/add-project-member.mutation';
import { useArchiveProjectMemberMutation } from '~/api/queries/project-members/archive-project-member.mutation';
import { useGetProjectMembersQuery } from '~/api/queries/project-members/get-project-members.query';
import { useUpdateProjectMemberMutation } from '~/api/queries/project-members/update-project-member.mutation';
import { useGetAllRolesQuery } from '~/api/queries/roles/get-all-roles.query';
import { FullProjectNodeMemberInfo } from '~/api/utils/api-requests';
import { getCurrentUserTimezone } from '~/app/user/user.store';
import { applyTzOffsetToSystemDate } from '~/utils/date/apply-tz-offset';
import { useNounDeclination } from '~/utils/hooks/use-noun-declination';
import { showErrorMessage } from '~/utils/show-error-message';

import { addParticipantModal } from './add-participant-form.component';
import { IAddParticipantForm } from './add-participant.schema';

export const useParticipants = (nodeId: string) => {
  const { t } = useTranslation();

  const participantGenitive = useNounDeclination({
    text: 'ENTITY.PARTICIPANT',
    gender: Gender.MASCULINE,
    morphologicalCase: Case.GENITIVE,
  });

  const { data: roles = [], isLoading: isRoleListLoading } = useGetAllRolesQuery();

  const { data: participants = [], isLoading: isParticipantListLoading } =
    useGetProjectMembersQuery(nodeId, { enabled: !!nodeId });

  const { mutateAsync: addParticipant } = useAddProjectMemberMutation(nodeId);

  const { mutate: deleteParticipant } = useArchiveProjectMemberMutation(nodeId, {
    onSuccess: () => notifySuccess(t('MESSAGE.DELETION_SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.DELETION_FAILED'),
  });

  const { mutateAsync: updateParticipant } = useUpdateProjectMemberMutation(nodeId, {
    onSuccess: () => notifySuccess(t('MESSAGE.UPDATE_SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.UPDATE_FAILED'),
  });

  const onAddParticipantClick = useCallback(async () => {
    const onSave = async (data: IAddParticipantForm) => {
      const promises = data.usersId.map(userId =>
        addParticipant({
          roleId: data.roleId,
          expirationTime: data.expirationTime,
          userId,
        }),
      );

      try {
        await Promise.all(promises);
        notifySuccess(t('MESSAGE.CREATION_SUCCESS'));
      } catch (e) {
        showErrorMessage(e, t('ERROR.CREATION_FAILED'));
      }
    };

    addParticipantModal({
      title: t('ACTION.ADD', { type: participantGenitive.toLowerCase() }),
      alreadyParticipantsId: participants.map(v => v.userId),
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSave: onSave,
    });
  }, [t, participantGenitive, participants, addParticipant]);

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

      const userTz = getCurrentUserTimezone();
      const expTime =
        expirationTime && isValid(expirationTime)
          ? applyTzOffsetToSystemDate(new Date(expirationTime), userTz)
          : expirationTime;

      try {
        const result = await updateParticipant({
          userId,
          roleId,
          expirationTime: expTime,
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
    participantGenitive,
    isDataLoading: isParticipantListLoading || isRoleListLoading,
    onAddParticipantClick,
    onUpdateParticipant,
    deleteParticipant,
  };
};

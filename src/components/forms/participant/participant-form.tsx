import { yupResolver } from '@hookform/resolvers/yup';
import { Form, FormItem, FormButtons, Button, modal } from '@pspod/ui-components';
import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { InstanceProps } from 'react-modal-promise';

import { getAllRolesQueryOptions } from '~/api/queries/roles/get-all-roles.query';
import { getActiveUsersQueryOptions } from '~/api/queries/users/get-active-users.query';
import { User } from '~/api/utils/api-requests';
import { FormDateTimePicker, FormSelect } from '~/components/react-hook-form';

import { schema, IAddParticipantForm } from './participant-form.schema';

interface ParticipantFormProps {
  onResolve: (data: IAddParticipantForm) => void;
  onReject: () => void;
  alreadyParticipantsId: string[];
}

export const ParticipantForm: FC<ParticipantFormProps> = ({
  onReject,
  onResolve,
  alreadyParticipantsId,
}) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    control,
    formState: { isValid, isSubmitted, isLoading },
  } = useForm<IAddParticipantForm>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: schema.getDefault(),
    resolver: yupResolver(schema),
  });

  const { data: roleList = [], isLoading: isRoleListLoading } = useQuery(getAllRolesQueryOptions());

  const { data: users = [], isLoading: isUserListLoading } = useQuery(
    getActiveUsersQueryOptions({
      select: data => selectUsers(data, alreadyParticipantsId),
    }),
  );

  return (
    <Form
      showColonAfterLabel
      isLoading={isRoleListLoading || isUserListLoading}
      onSubmit={handleSubmit(onResolve)}
    >
      <FormItem isRequired label={t('ENTITY.PARTICIPANT')}>
        <FormSelect
          isMultiple
          items={users}
          controllerProps={{ ...register('usersId'), control }}
        />
      </FormItem>
      <FormItem isRequired label={t('ENTITY.ROLE')}>
        <FormSelect
          items={roleList}
          displayExpr={'title'}
          controllerProps={{ ...register('roleId'), control }}
        />
      </FormItem>
      <FormItem label={t('COMMON.DATE_EXPIRED')}>
        <FormDateTimePicker
          type={'datetime'}
          controllerProps={{ ...register('expirationTime'), control }}
          minDate={new Date()}
        />
      </FormItem>
      <FormButtons>
        <Button onClick={onReject} variant={'outlined'} color={'primary'}>
          {t('ACTION.CANCEL')}
        </Button>
        <Button
          type={'submit'}
          disabled={!isValid && isSubmitted}
          variant={'contained'}
          color={'primary'}
          isLoading={isLoading}
        >
          {t('ACTION.ADD')}
        </Button>
      </FormButtons>
    </Form>
  );
};

export const addParticipantModal = ({
  title,
  alreadyParticipantsId,
  onSave,
}: {
  title: string;
  alreadyParticipantsId: string[];
  onSave: (data: IAddParticipantForm) => void;
}) =>
  modal({
    title,
    onOk: onSave,
    renderContent: (modalInstance: InstanceProps<IAddParticipantForm, never>) => (
      <ParticipantForm {...modalInstance} alreadyParticipantsId={alreadyParticipantsId} />
    ),
  });

function selectUsers(users: User[] | undefined, excludeIds: string[]) {
  return users
    ?.map(user => {
      let userName = `${user.lastName} ${user.firstName}`;
      if (user.surName) {
        userName += ` ${user.surName}`;
      }
      userName += ` (${user.email})`;
      return { id: user.id, name: userName };
    })
    .filter(user => !excludeIds.includes(user.id!));
}

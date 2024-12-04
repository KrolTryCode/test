import { FormItem, Fieldset, FormButtons, Button } from '@pspod/ui-components';
import { FC } from 'react';
import { Control, UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormInputText } from '~/components/react-hook-form';
import { UpdateUserRequestNullable } from '~/components/user-profile/user-profile-form/profile-form.schema';

interface PersonalDataProps {
  control: Control<UpdateUserRequestNullable>;
  register: UseFormRegister<UpdateUserRequestNullable>;
  onChangePasswordByAdmin?: () => void;
}

export const PersonalData: FC<PersonalDataProps> = ({
  control,
  register,
  onChangePasswordByAdmin,
}) => {
  const { t } = useTranslation();

  return (
    <Fieldset legend={t('USER.CAPTION.PERSONAL_DATA')} columnGap={8}>
      <Fieldset direction={'column'}>
        <FormItem label={t('USER.LAST_NAME')} isRequired>
          <FormInputText controllerProps={{ ...register('lastName'), control }} />
        </FormItem>
        <FormItem label={t('USER.FIRST_NAME')} isRequired>
          <FormInputText controllerProps={{ ...register('firstName'), control }} />
        </FormItem>
        <FormItem label={t('USER.PATRONYMIC')}>
          <FormInputText controllerProps={{ ...register('surName'), control }} />
        </FormItem>
      </Fieldset>

      <Fieldset direction={'column'}>
        <FormItem label={t('USER.WORK_ENTERPRISE')}>
          <FormInputText controllerProps={{ ...register('company'), control }} />
        </FormItem>
        <FormItem label={t('USER.SUBDIVISION')}>
          <FormInputText controllerProps={{ ...register('division'), control }} />
        </FormItem>
        <FormItem label={t('USER.WORK_POST')}>
          <FormInputText controllerProps={{ ...register('position'), control }} />
        </FormItem>
        {onChangePasswordByAdmin && (
          <FormButtons>
            <Button onClick={onChangePasswordByAdmin}>
              {t('ACTION.CHANGE', {
                type: t('AUTH.PASSWORD.NAME').toLowerCase(),
              })}
            </Button>
          </FormButtons>
        )}
      </Fieldset>
    </Fieldset>
  );
};

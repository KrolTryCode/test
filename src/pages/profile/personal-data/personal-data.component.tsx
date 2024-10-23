import { FormItem, Fieldset, FormButtons, Button } from '@pspod/ui-components';
import { FC } from 'react';
import { Control, UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormInputText } from '~/components/react-hook-form/form-input-text/form-input-text.component';
import { UpdateUserRequestNullable } from '~/pages/profile/profile-form.schema';

interface PersonalDataProps {
  control: Control<UpdateUserRequestNullable>;
  register: UseFormRegister<UpdateUserRequestNullable>;
  isAdminPage?: boolean;
  onChangePassword: () => void;
}

export const PersonalData: FC<PersonalDataProps> = ({
  control,
  register,
  onChangePassword,
  isAdminPage = false,
}) => {
  const { t } = useTranslation();

  return (
    <Fieldset legend={t('USER.CAPTION.PERSONAL_DATA')} columnGap={8}>
      <Fieldset direction={'column'}>
        <FormItem label={t('USER.LAST_NAME')}>
          <FormInputText controllerProps={{ ...register('lastName'), control }} />
        </FormItem>
        <FormItem label={t('USER.FIRST_NAME')}>
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
        {isAdminPage && (
          <FormButtons>
            <Button onClick={onChangePassword}>
              {t('BUTTON.CHANGE', {
                type: t('AUTH.PASSWORD.NAME').toLowerCase(),
              })}
            </Button>
          </FormButtons>
        )}
      </Fieldset>
    </Fieldset>
  );
};

import { FC } from 'react';
import { Control, UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormInputText } from '~/components/react-hook-form/form-input-text/form-input-text.component';
import { FormItem, Fieldset } from '~/ui-components/form';

import { UpdateProfileForm } from '../profile.schema';

interface PersonalDataProps {
  control: Control<UpdateProfileForm>;
  register: UseFormRegister<UpdateProfileForm>;
  isAdminPage?: boolean;
}

export const PersonalData: FC<PersonalDataProps> = ({ control, register, isAdminPage }) => {
  const { t } = useTranslation();

  return (
    <Fieldset legend={t('USER.CAPTION.PERSONAL_DATA')} columnGap={8}>
      <Fieldset direction={'column'}>
        <FormItem label={t('USER.FIRST_NAME')}>
          <FormInputText controllerProps={{ ...register('firstName'), control }} />
        </FormItem>
        <FormItem label={t('USER.LAST_NAME')}>
          <FormInputText controllerProps={{ ...register('lastName'), control }} />
        </FormItem>
        <FormItem label={t('USER.PATRONYMIC')}>
          <FormInputText controllerProps={{ ...register('patronymic'), control }} />
        </FormItem>
      </Fieldset>

      <Fieldset direction={'column'}>
        <FormItem label={t('USER.WORK_ENTERPRISE')}>
          <FormInputText controllerProps={{ ...register('enterprise'), control }} />
        </FormItem>
        <FormItem label={t('USER.SUBDIVISION')}>
          <FormInputText controllerProps={{ ...register('subdivision'), control }} />
        </FormItem>
        <FormItem label={t('USER.WORK_POST')}>
          <FormInputText controllerProps={{ ...register('workPost'), control }} />
        </FormItem>
        <FormItem
          label={t('COMMON.NEW', {
            type: t('AUTH.PASSWORD.NAME').toLowerCase(),
          })}
          isHidden={!isAdminPage}
        >
          <FormInputText
            type={'password'}
            autoComplete={'new-password'}
            controllerProps={{ ...register('newPassword'), control }}
          />
        </FormItem>
        <FormItem label={t('AUTH.PASSWORD.REPEAT')} isHidden={!isAdminPage}>
          <FormInputText
            type={'password'}
            autoComplete={'new-password'}
            controllerProps={{ ...register('confirmPassword'), control }}
          />
        </FormItem>
      </Fieldset>
    </Fieldset>
  );
};

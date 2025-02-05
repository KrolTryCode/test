import { FormItem, Fieldset } from '@pspod/ui-components';
import { FC } from 'react';
import { Control, UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { UpdateUserRequestNullable } from '~/components/forms/profile/profile-form.schema';
import { FormInputText } from '~/components/react-hook-form';
import { FormInputPhone } from '~/components/react-hook-form/form-input-phone/form-input-phone.component';

interface ContactsProps {
  control: Control<UpdateUserRequestNullable>;
  register: UseFormRegister<UpdateUserRequestNullable>;
}

export const Contacts: FC<ContactsProps> = ({ control, register }) => {
  const { t } = useTranslation();

  return (
    <Fieldset legend={t('USER.CAPTION.CONTACTS')} columnGap={8}>
      <Fieldset direction={'column'}>
        <FormItem label={t('USER.EMAIL')} isRequired>
          <FormInputText type={'email'} controllerProps={{ ...register('email'), control }} />
        </FormItem>
      </Fieldset>

      <Fieldset direction={'column'}>
        <FormItem label={t('USER.PHONE_NUMBER')} isRequired>
          <FormInputPhone controllerProps={{ ...register('phoneNumber'), control }} />
        </FormItem>
      </Fieldset>
    </Fieldset>
  );
};

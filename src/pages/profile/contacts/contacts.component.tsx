import { FC } from 'react';
import { Control, UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormCheckbox } from '~/components/react-hook-form/form-checkbox/form-checkbox.component';
import { FormInputText } from '~/components/react-hook-form/form-input-text/form-input-text.component';
import { FormItem, Fieldset } from '~/ui-components/form';

import { UpdateProfileForm } from '../profile-form.schema';

interface ContactsProps {
  control: Control<UpdateProfileForm>;
  register: UseFormRegister<UpdateProfileForm>;
}

export const Contacts: FC<ContactsProps> = ({ control, register }) => {
  const { t } = useTranslation();

  return (
    <Fieldset legend={t('USER.CAPTION.CONTACTS')} columnGap={8}>
      <Fieldset direction={'column'}>
        <FormItem label={t('USER.EMAIL')}>
          <FormInputText type={'email'} controllerProps={{ ...register('email'), control }} />
        </FormItem>
        <FormCheckbox
          label={t('USER.WANT_TO_SUBSCRIBE')}
          controllerProps={{ ...register('subscribe'), control }}
        />
      </Fieldset>

      <Fieldset direction={'column'}>
        <FormItem label={t('USER.PHONE_NUMBER')}>
          <FormInputText
            mask={'+7 (000) 000-00-00'}
            controllerProps={{ ...register('phone'), control }}
          />
        </FormItem>
      </Fieldset>
    </Fieldset>
  );
};

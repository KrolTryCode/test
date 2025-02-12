import { FormItem, Fieldset, InputText, DateTimePicker } from '@pspod/ui-components';
import { FC } from 'react';
import { Control, UseFormRegister } from 'react-hook-form';

import { User, UserState } from '~/api/utils/api-requests';
import { UpdateUserRequestNullable } from '~/components/forms/profile/profile-form.schema';
import { useCustomTranslations } from '~/utils/hooks';

interface SystemDataProps {
  control: Control<UpdateUserRequestNullable>;
  register: UseFormRegister<UpdateUserRequestNullable>;
  isAdminPage?: boolean;
  profileData?: User;
}

export const SystemData: FC<SystemDataProps> = ({ profileData, isAdminPage }) => {
  const { t, translateStatus } = useCustomTranslations();

  const createdDate = profileData?.createdFrom ? new Date(profileData.createdFrom) : null;
  const lastLoginDate = profileData?.lastSuccessfulLoginTime
    ? new Date(profileData.lastSuccessfulLoginTime)
    : null;

  return (
    <Fieldset legend={t('USER.CAPTION.SYSTEM_DATA')} columnGap={8}>
      <Fieldset direction={'column'}>
        <FormItem label={t('USER.REGISTRATION_DATE')}>
          <DateTimePicker value={createdDate} type={'datetime'} />
        </FormItem>

        <FormItem label={t('USER.DATE_LAST_LOGIN')}>
          <DateTimePicker value={lastLoginDate} type={'datetime'} />
        </FormItem>
        <FormItem label={t('USER.IP_ADDRESS')}>
          <InputText isReadonly value={profileData?.lastIpAddress ?? ''} />
        </FormItem>
        <FormItem label={t('COMMON.STATE')} isHidden={!isAdminPage}>
          <InputText
            invalid={profileData?.state === UserState.Blocked}
            isReadonly
            value={translateStatus(profileData?.state)}
          />
        </FormItem>
      </Fieldset>
    </Fieldset>
  );
};

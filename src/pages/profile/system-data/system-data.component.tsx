import { FC } from 'react';
import { Control, UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { User, UserStateEnum } from '~/api/utils/api-requests';
import { DateTimePicker } from '~/ui-components/date-time-picker/date-time-picker.component';
import { FormItem, Fieldset } from '~/ui-components/form';
import { InputText } from '~/ui-components/input-text/input-text.component';
import { Select } from '~/ui-components/select/select.component';
import { translateStatus } from '~/utils/translate-status';

import { UpdateProfileForm } from '../profile.schema';

interface SystemDataProps {
  control: Control<UpdateProfileForm>;
  register: UseFormRegister<UpdateProfileForm>;
  isAdminPage?: boolean;
  profileData?: User;
}

export const SystemData: FC<SystemDataProps> = ({ profileData, isAdminPage }) => {
  const { t } = useTranslation();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const createdDate = (profileData?.created as string)
    ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      new Date(profileData.created as string)
    : null;

  return (
    <Fieldset legend={t('USER.CAPTION.SYSTEM_DATA')} columnGap={8}>
      <Fieldset direction={'column'}>
        <FormItem label={t('USER.REGISTRATION_DATE')}>
          <DateTimePicker value={createdDate} type={'datetime'} />
        </FormItem>

        <FormItem label={t('USER.DATE_LAST_LOGIN')}>
          <DateTimePicker value={createdDate} type={'datetime'} />
        </FormItem>
        <FormItem label={t('USER.IP_ADDRESS')}>
          <InputText isReadonly value={''} />
        </FormItem>
        <FormItem label={t('COMMON.STATE')} isHidden={!isAdminPage}>
          <InputText
            invalid={profileData?.state === UserStateEnum.Blocked}
            isReadonly
            value={translateStatus(profileData?.state)}
          />
        </FormItem>
        <FormItem label={t('USER.CREATED_BY')} isHidden={!isAdminPage}>
          <InputText isReadonly value={''} />
        </FormItem>
      </Fieldset>

      <Fieldset direction={'column'}>
        <FormItem label={t('USER.TIME_ZONE')}>
          <Select items={[]} />
        </FormItem>
        {isAdminPage && (
          <>
            <FormItem label={t('USER.LANGUAGE')}>
              <Select items={[]} />
            </FormItem>
            <FormItem label={t('USER.NOTES')}>
              <InputText isMultiline value={''} />
            </FormItem>
          </>
        )}
      </Fieldset>
    </Fieldset>
  );
};

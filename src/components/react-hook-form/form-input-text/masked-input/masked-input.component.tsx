import { InputText, InputTextProps } from '@pspod/ui-components';
import { FC } from 'react';
import { IMaskMixin } from 'react-imask';

export interface MaskedInputProps extends InputTextProps {
  mask: string;
  definitions?: Record<string, RegExp>;
  // add other mask props if needed
}

const MaskedTextField = IMaskMixin(({ inputRef, ...otherProps }) => {
  return <InputText {...(otherProps as any)} inputRef={inputRef} isMasked />;
});

export const MaskedInput: FC<MaskedInputProps> = ({ mask, definitions, onChange, ...props }) => {
  return (
    <MaskedTextField
      onAccept={onChange}
      mask={mask}
      definitions={definitions}
      placeholder={mask.replaceAll(/{|}/g, '')}
      lazy
      overwrite
      unmask
      {...props}
    />
  );
};

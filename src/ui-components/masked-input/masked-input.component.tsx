import { FC } from 'react';
import { IMaskMixin } from 'react-imask';

import { InputText } from '../input-text/input-text.component';
import { InputTextProps } from '../input-text/input-text.type';

interface MaskedInputProps extends InputTextProps {
  mask: string;
  // add other mask props if needed
}

const MaskedTextField = IMaskMixin(({ inputRef, ...otherProps }) => {
  return <InputText {...(otherProps as any)} inputRef={inputRef} isMasked />;
});

export const MaskedInput: FC<MaskedInputProps> = ({ mask, onChange, ...props }) => (
  <MaskedTextField
    onAccept={onChange}
    mask={mask}
    placeholder={mask.replaceAll(/{|}/g, '')}
    lazy
    overwrite
    unmask
    {...props}
  />
);

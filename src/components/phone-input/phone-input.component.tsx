import { CircularProgress, Icon, InputAdornment } from '@mui/material';
import { MuiTelInput, MuiTelInputInfo } from 'mui-tel-input';
import { FC, FocusEventHandler, useState } from 'react';

interface PhoneInputProps {
  value: string;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange: (value: string, info: MuiTelInputInfo) => void;
  error?: boolean;
}

export const PhoneInput: FC<PhoneInputProps> = ({ value, onChange, onBlur, error }) => {
  const [isLoading, setIsLoading] = useState(false);

  const LoaderCircle = (
    <InputAdornment position={'start'}>
      <Icon
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '10px',
        }}
      >
        <CircularProgress size={18} />
      </Icon>
    </InputAdornment>
  );

  return (
    <MuiTelInput
      value={value}
      error={error}
      onBlur={onBlur}
      onChange={onChange}
      defaultCountry={'RU'}
      langOfCountryName={'ru'}
      InputProps={isLoading ? { startAdornment: LoaderCircle } : {}}
      MenuProps={{
        transformOrigin: { horizontal: 'left', vertical: 'top' },
        anchorOrigin: { horizontal: 'left', vertical: 'bottom' },
        onTransitionEnter: () => setIsLoading(true),
        onTransitionExited: () => setIsLoading(false),
      }}
    />
  );
};

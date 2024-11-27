import { Box, CircularProgress, Icon, InputAdornment } from '@mui/material';
import { MuiTelInput, MuiTelInputInfo, MuiTelInputCountry } from 'mui-tel-input';
import { FC, FocusEventHandler, useState } from 'react';
import 'flag-icons/css/flag-icons.min.css';

interface PhoneInputProps {
  value: string;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange: (value: string, info: MuiTelInputInfo) => void;
  error?: boolean;
}

export const PhoneInput: FC<PhoneInputProps> = ({ value, onChange, onBlur, error }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <MuiTelInput
      value={value}
      error={error}
      onBlur={onBlur}
      onChange={onChange}
      defaultCountry={'RU'}
      langOfCountryName={'ru'}
      InputProps={isLoading ? { startAdornment: <LoaderCircle /> } : {}}
      getFlagElement={getFlagElement}
      MenuProps={{
        transformOrigin: { horizontal: 'left', vertical: 'top' },
        anchorOrigin: { horizontal: 'left', vertical: 'bottom' },
        onTransitionEnter: () => setIsLoading(true),
        onTransitionExited: () => setIsLoading(false),
      }}
    />
  );
};

function LoaderCircle() {
  return (
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
}

function getFlagElement(isoCode: MuiTelInputCountry) {
  let cn = isoCode.toLowerCase();

  if (isoCode === 'AC') {
    cn = 'sh-ac';
  } else if (isoCode === 'TA') {
    cn = 'sh-ta';
  }

  return (
    <Box
      className={`fi fi-${cn}`}
      sx={{
        '&.fi': {
          width: '26px',
          lineHeight: 'unset',
        },
      }}
    />
  );
}

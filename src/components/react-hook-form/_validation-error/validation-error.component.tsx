import { Box } from '@mui/material';
import { Tooltip } from '@pspod/ui-components';
import { TFunction } from 'i18next';
import { FC, ReactNode } from 'react';
import { FieldError } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

const PopperProps = { disablePortal: true };

interface YupError {
  key: string;
  values: Record<string, any>;
}

interface Error extends Omit<FieldError, 'message'> {
  message?: string | YupError;
}

interface ValidationErrorProps {
  children: ReactNode;
  placement?: 'top' | 'bottom';
  error?: Error | Record<string, Error>;
  fullWidth?: boolean;
}

export const ValidationError: FC<ValidationErrorProps> = ({
  placement = 'bottom',
  error,
  children,
  fullWidth,
}) => {
  const { t } = useTranslation();

  return (
    <Tooltip
      content={getMessages(error, t)}
      hasOffset={false}
      variant={'error'}
      placement={`${placement}-start`}
      PopperProps={PopperProps}
    >
      <Box width={fullWidth ? '100%' : undefined}>{children}</Box>
    </Tooltip>
  );
};

function getMessages(error: ValidationErrorProps['error'], t: TFunction): string | undefined {
  if (error && !error.message) {
    return Object.values(error)
      .map((err: Error) => getMessage(err, t))
      .join(' ');
  }

  if (error?.message) {
    return getMessage(error as Error, t);
  }
}

function getMessage(error: Error, t: TFunction): string | undefined {
  const msg =
    typeof error?.message === 'object'
      ? t(error.message.key, error.message.values)
      : error?.message;

  if (msg && typeof msg !== 'string') {
    console.error('Сообщение об ошибке не является строкой! ', msg);
  }

  return msg?.toString();
}

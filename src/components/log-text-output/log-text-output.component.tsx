import { CopyAll } from '@mui/icons-material';
import { styled, Card, CardProps } from '@mui/material';
import { Button } from '@pspod/ui-components';

interface LogTextOutputProps extends Omit<CardProps, 'children'> {
  children: string;
}

export const LogTextOutput = styled((props: LogTextOutputProps) => {
  const copy = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(props.children);
    }
  };

  return (
    <Card component={'pre'} variant={'outlined'} {...props}>
      <Button
        hidden={!navigator.clipboard}
        size={'small'}
        variant={'text'}
        onClick={copy}
        icon={<CopyAll />}
      />
      {props.children}
    </Card>
  );
})(({ theme }) => ({
  padding: theme.spacing(1),
  borderStyle: 'dashed',
  borderColor: theme.palette.primary.main,
  overflow: 'auto',
}));

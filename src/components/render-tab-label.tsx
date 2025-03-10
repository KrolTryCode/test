import { Typography } from '@mui/material';

export function renderTabLabel(text: string) {
  return (
    <Typography
      variant={'h4'}
      component={'h2'}
      marginInline={'6px'}
      lineHeight={1}
      gutterBottom={false}
    >
      {text}
    </Typography>
  );
}

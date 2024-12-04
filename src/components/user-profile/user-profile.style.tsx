import { Stack, StackProps, styled, Typography } from '@mui/material';

export const UserProfileLayout = styled((props: StackProps) => <Stack gap={2} {...props} />)(
  ({ theme }) => ({
    width: '100%',
    maxWidth: theme.breakpoints.values.md,
    marginInline: 'auto',
  }),
);

export const UserProfileHeader = styled(
  ({ userName, ...props }: StackProps & { userName: string }) => (
    <Stack gap={2} direction={'row'} alignItems={'center'} {...props}>
      {props.children}
      <Typography variant={'h3'} component={'h2'} gutterBottom={false}>
        {userName}
      </Typography>
    </Stack>
  ),
)(({ theme }) => ({
  position: 'sticky',
  marginTop: `-${theme.spacing(1)}`,
  top: `-${theme.spacing(1)}`,
  paddingBlock: theme.spacing(1),
  backgroundColor: theme.palette.common.white,
  zIndex: 1,
}));

export const UserProfileContent = styled((props: StackProps) => <Stack gap={6} {...props} />)(
  ({ theme }) => ({
    flexDirection: 'row',
    '& > .MuiAvatar-root, & > .profile-avatar': {
      position: 'sticky',
      top: theme.spacing(7),
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
      '& > .MuiAvatar-root, & > .profile-avatar': {
        position: 'static',
      },
    },
  }),
);

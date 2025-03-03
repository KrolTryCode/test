import { Box, styled } from '@mui/material';

export const _ProjectsTreeContainer = styled(Box)(({ theme }) => ({
  width: 'min(900px, 100%)',
  alignSelf: 'center',
  boxShadow: `0 0 1em ${theme.palette.primary.main}44`,
  borderRadius: 10,
  marginTop: 15,
  paddingInline: theme.spacing(1),
}));

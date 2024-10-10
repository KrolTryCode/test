import { styled, DialogTitle, Paper, DialogContent } from '@mui/material';

export const StyledDialogTitle = styled(DialogTitle)`
  min-height: 40px;
  padding-right: 50px;
`;

export const StyledDialogPaper = styled(Paper)`
  width: auto;
  min-width: 50vh;
  height: auto;
  max-height: 90vh;
`;

export const StyledDialogContent = styled(DialogContent)`
  position: relative;
  display: flex;

  & > * {
    height: 100%;
  }
`;

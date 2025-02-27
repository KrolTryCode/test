import { styled } from '@mui/material';
import { Link } from '@tanstack/react-router';

export const StyledHeader = styled('header')(
  ({ theme }) =>
    `
  z-index: 2;
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  height: 66px;
  padding: 0 0 0 ${theme.spacing(1)};
  background: ${theme.palette.primary.main};
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.12),
    0 1px 2px rgba(0, 0, 0, 0.24);

  img.logo {
    width: 50px;
    height: 50px;
  }
`,
);

export const QuestionMarkWrapper = styled('b')(
  ({ theme }) => `
  display: block;
  width: 20px;
  margin: 8px;
  font-size: 14px;
  color: ${theme.palette.primary.main};
  text-align: center;
  background: white;
  border-radius: 50%;
`,
);

export const StyledHeaderHelp = styled(Link)`
  padding: 8px;
  margin-top: -3px;
  text-decoration: none;
`;

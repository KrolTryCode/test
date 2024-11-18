import { styled } from '@mui/material';
import { Link } from 'react-router-dom';

export const StyledHeader = styled('header')(
  ({ theme }) =>
    `
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  padding: 0 0 0 ${theme.spacing(1)};
  background: ${theme.palette.primary.main};
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.12),
    0 1px 2px rgba(0, 0, 0, 0.24);

  img {
    width: 50px;
    height: 50px;
  }
`,
);

export const QuestionMarkWrapper = styled('b')(
  ({ theme }) => `
  display: block;
  width: 20px;
  height: 20px;
  font-size: 14px;
  color: ${theme.palette.primary.main};
  text-align: center;
  background: white;
  border-radius: 50%;
`,
);

export const StyledHeaderHelp = styled(Link)`
  margin: auto 20px;
  text-decoration: none;
`;

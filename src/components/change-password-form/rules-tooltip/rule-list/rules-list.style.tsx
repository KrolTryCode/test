import { styled, Box, BoxProps } from '@mui/material';

export const StyledList = styled((props: BoxProps) => <Box {...props} component={'ul'} />)`
  width: 290px;
  padding-left: 15px;
  margin: 0;
  text-align: left;
  text-wrap: wrap;
`;

export const StyledListItem = styled((props: BoxProps) => (
  <Box {...props} component={'li'} paddingRight={1} />
))`
  &:not(:last-child) {
    margin-bottom: 4px;
  }
`;

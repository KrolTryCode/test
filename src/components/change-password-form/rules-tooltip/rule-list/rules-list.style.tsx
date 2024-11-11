import { styled, BoxProps } from '@mui/material';

//@ts-expect-error ul ref typing
export const StyledList = styled((props: BoxProps) => <ul {...props} />)`
  width: 290px;
  padding-left: 15px;
  margin: 0;
  text-align: left;
  text-wrap: wrap;
`;

export const StyledListItem = styled((props: BoxProps) => (
  //@ts-expect-error li ref typing
  <li {...props} style={{ paddingRight: 1 }} />
))`
  &:not(:last-child) {
    margin-bottom: 4px;
  }
`;

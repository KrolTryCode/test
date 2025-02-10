import { styled } from '@mui/material';
import { TreeItem2Label } from '@mui/x-tree-view';
import { Link } from '@tanstack/react-router';

export const StyledLink = styled(Link)`
  color: #333 !important;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const StyledTreeItemLabel = styled(TreeItem2Label)`
  display: flex;
  align-items: center;

  & + .dropdown-menu {
    .MuiSvgIcon-root {
      font-size: 1rem;
    }
  }
`;

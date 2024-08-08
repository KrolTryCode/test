import CheckedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import UncheckedIcon from '@mui/icons-material/CheckBoxOutlined';
import IndeterminateCheckedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import { IconButton, styled } from '@mui/material';
import { FC } from 'react';

const StyledButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '2px',
  left: '3px',
  width: '32px',
  height: '32px',
  color: 'inherit',
  borderRadius: '4px',
  zIndex: 1,

  '&:hover': {
    backgroundColor: `${theme.palette.text.primary}15`,
  },

  '&[hidden]': {
    visibility: 'hidden',
  },
}));

interface CheckButtonProps {
  onClick: (checked: boolean) => void;
  selectedCount?: number;
  allCount: number;
  hidden?: boolean;
}

export const CheckButton: FC<CheckButtonProps> = ({
  allCount,
  hidden = false,
  selectedCount = 0,
  onClick,
}) => {
  const isAllSelected = allCount === selectedCount;
  const isSomethingSelected = !!selectedCount;
  const Icon = isAllSelected
    ? UncheckedIcon
    : isSomethingSelected
      ? IndeterminateCheckedIcon
      : CheckedIcon;

  return (
    <StyledButton hidden={hidden} onClick={() => onClick(isAllSelected)} size={'small'}>
      <Icon fontSize={'small'} />
    </StyledButton>
  );
};

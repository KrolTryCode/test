import { CloseOutlined } from '@mui/icons-material';
import { Dialog as MDialog, IconButton } from '@mui/material';

import {
  StyledDialogPaper,
  StyledDialogTitle,
  StyledDialogContent,
} from '~/components/modal/dialog/dialog.style';

import { CreateModalProps, DialogRenderProps } from '../modal.type';

export function Dialog<Resolve, Reject>({
  renderContent,
  title,
  maxWidth = 'sm',
  dividers = true,
  fullScreen,
  ...instanceProps
}: CreateModalProps<DialogRenderProps<Resolve, Reject>>) {
  return (
    <MDialog
      fullScreen={fullScreen}
      open={instanceProps.isOpen}
      maxWidth={maxWidth}
      scroll={'paper'}
      fullWidth={true}
      PaperComponent={StyledDialogPaper}
      onClose={instanceProps.onReject}
    >
      <StyledDialogTitle>
        {title}
        <IconButton onClick={instanceProps.onReject}>
          <CloseOutlined />
        </IconButton>
      </StyledDialogTitle>
      <StyledDialogContent dividers={dividers}>{renderContent(instanceProps)}</StyledDialogContent>
    </MDialog>
  );
}

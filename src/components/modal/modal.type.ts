import { DialogContentProps, DialogProps } from '@mui/material';
import { InstanceProps } from 'react-modal-promise';

export type CreateModalProps<T, Resolve = any, Reject = any> = T & InstanceProps<Resolve, Reject>;

export interface DialogRenderProps<Resolve, Reject>
  extends Pick<DialogProps, 'title' | 'maxWidth' | 'fullScreen'>,
    Pick<DialogContentProps, 'dividers'> {
  renderContent: (instanceProps: InstanceProps<Resolve, Reject>) => JSX.Element;
}

export interface ModalFuncProps<Resolve = any, Reject = any>
  extends DialogRenderProps<Resolve, Reject> {
  onOk?: (res: Resolve) => any;
  onCancel?: (rej: Reject) => any;
}

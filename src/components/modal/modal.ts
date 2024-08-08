import { create } from 'react-modal-promise';

import { Dialog } from './dialog/dialog.component';
import { CreateModalProps, ModalFuncProps, DialogRenderProps } from './modal.type';

export function modal<Resolve = never, Reject = never>({
  onOk,
  onCancel = (_: Reject) => void 0,
  ...popupProps
}: ModalFuncProps<Resolve, Reject>) {
  void create<CreateModalProps<DialogRenderProps<Resolve, Reject>>>(Dialog)(popupProps).then(
    onOk,
    onCancel,
  );
}

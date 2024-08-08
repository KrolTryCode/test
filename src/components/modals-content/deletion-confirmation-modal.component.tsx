import { modal } from '../modal/modal';

import { ConfirmActionModalContent } from './confirm-action-modal.component';

interface ConfirmDeletionModal {
  onOk: () => void;
  title: string;
}

export const confirmDeletionModal = ({ onOk, title }: ConfirmDeletionModal) => {
  modal({
    onOk,
    title,
    renderContent: instanceProps => (
      <ConfirmActionModalContent
        rejectText={'BUTTON.CANCEL'}
        acceptText={'BUTTON.DELETE'}
        {...instanceProps}
      />
    ),
  });
};

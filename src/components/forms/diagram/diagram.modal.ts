// src/components/forms/diagram/diagram.modal.ts
import { modal } from '@pspod/ui-components';
import { createElement } from 'react';  // Добавлен импорт createElement

import { DiagramRequest } from '~/api/utils/api-requests';
import { DiagramForm } from './diagram-form';

interface DiagramModalProps {
  title: string;
  onSave: (data: DiagramRequest) => void;
  data?: Partial<DiagramRequest>;
  isPending?: boolean;
}

export const diagramModal = ({ title, onSave, data, isPending }: DiagramModalProps) => {
  modal({
    title,
    onOk: onSave,
    renderContent: (args) => createElement(DiagramForm, {
      ...args,
      data,
      isPending
    })
  });
};

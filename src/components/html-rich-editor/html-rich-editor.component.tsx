import { html } from '@codemirror/lang-html';
import Box from '@mui/material/Box';
import ReactCodeMirror from '@uiw/react-codemirror';
import { FC, FocusEventHandler } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Panel,
  PanelGroup,
  PanelResizer,
} from '~/ui-components/resizable-panels/resizable-panels.component';

export type HTMLRichEditorProps = {
  value?: string;
  isFieldStateError: boolean;
  onChange: (value: string | undefined) => void;
  onBlur?: FocusEventHandler<HTMLDivElement> | undefined;
};

export const HTMLRichEditor: FC<HTMLRichEditorProps> = ({
  value,
  isFieldStateError,
  onChange,
  onBlur,
}) => {
  const { t } = useTranslation();

  return (
    <Box
      width={'100%'}
      height={'610px'}
      border={'solid 1px'}
      borderRadius={'4px'}
      borderColor={theme => (isFieldStateError ? theme.palette.error.main : 'transparent')}
    >
      <PanelGroup autoSaveId={'editor'} direction={'horizontal'}>
        <Panel minSize={15} defaultSize={50}>
          <Box height={'100%'} overflow={'auto'} display={'flex'}>
            <ReactCodeMirror
              value={value}
              placeholder={t('COMMON.ENTER_TEXT')}
              extensions={[html()]}
              onBlur={onBlur}
              height={'100%'}
              style={{ flexGrow: 1 }}
              onChange={onChange}
            />
          </Box>
        </Panel>
        <PanelResizer />
        <Panel minSize={20} style={{ overflow: 'auto' }}>
          <Box padding={'8px'} dangerouslySetInnerHTML={{ __html: value ?? '' }} />
        </Panel>
      </PanelGroup>
    </Box>
  );
};

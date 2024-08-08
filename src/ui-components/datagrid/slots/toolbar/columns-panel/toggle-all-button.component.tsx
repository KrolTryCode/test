import { CheckBox, CheckBoxOutlineBlank, IndeterminateCheckBox } from '@mui/icons-material';
import { Button } from '@mui/material';
import { GridPanelFooter } from '@mui/x-data-grid-premium';
import { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

type Visibility = 'all' | 'some' | 'none';

const iconMap: Record<Visibility, ReactNode> = {
  all: <CheckBox />,
  some: <IndeterminateCheckBox />,
  none: <CheckBoxOutlineBlank />,
};

export const ToggleAllButton: FC<{
  hideableColumnsLength: number;
  groupedColumnFieldsLength: number;
  visibleColumnsLength: number;
  onClick: (isVisible: boolean) => void;
}> = ({ hideableColumnsLength, visibleColumnsLength, groupedColumnFieldsLength, onClick }) => {
  const { t } = useTranslation();

  const noneVisible = visibleColumnsLength - groupedColumnFieldsLength === 0;
  const allVisible = hideableColumnsLength === visibleColumnsLength + groupedColumnFieldsLength;
  const visibility = noneVisible ? 'none' : allVisible ? 'all' : 'some';

  return (
    <GridPanelFooter style={{ padding: '6px 20px', justifyContent: 'center' }}>
      <Button startIcon={iconMap[visibility]} onClick={() => onClick(!allVisible)}>
        {t('BUTTON.SHOW_OR_HIDE_ALL')}
      </Button>
    </GridPanelFooter>
  );
};

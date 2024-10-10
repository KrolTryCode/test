import { CheckBox, CheckBoxOutlineBlank, IndeterminateCheckBox } from '@mui/icons-material';
import { Button } from '@mui/material';
import { GridPanelFooter } from '@mui/x-data-grid-premium';
import { FC, ReactNode } from 'react';

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
  buttonText: string;
  onClick: (isVisible: boolean) => void;
}> = ({
  hideableColumnsLength,
  visibleColumnsLength,
  groupedColumnFieldsLength,
  buttonText,
  onClick,
}) => {
  const noneVisible = visibleColumnsLength - groupedColumnFieldsLength === 0;
  const allVisible = hideableColumnsLength === visibleColumnsLength + groupedColumnFieldsLength;
  const visibility = noneVisible ? 'none' : allVisible ? 'all' : 'some';

  return (
    <GridPanelFooter style={{ padding: '6px 20px', justifyContent: 'center' }}>
      <Button startIcon={iconMap[visibility]} onClick={() => onClick(!allVisible)}>
        {buttonText}
      </Button>
    </GridPanelFooter>
  );
};
